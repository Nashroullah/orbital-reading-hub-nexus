
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, channel = 'sms' } = await req.json();
    
    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone number is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (channel !== 'sms' && channel !== 'call') {
      return new Response(
        JSON.stringify({ error: "Channel must be 'sms' or 'call'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Get Twilio credentials from environment variables
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");
    
    if (!accountSid || !authToken || !twilioPhone) {
      console.error("Missing Twilio credentials");
      
      // For development purposes only, return the OTP directly in response
      // In production, this should log an error and use a fallback method
      console.log(`Development mode: Generated OTP for ${phone} is ${otp}`);
      
      // Create Supabase client
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Store OTP in database with expiration (15 minutes)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      
      const { error: insertError } = await supabase
        .from('phone_verification')
        .upsert([
          { 
            phone: phone,
            otp: otp,
            expires_at: expiresAt.toISOString()
          }
        ]);
      
      if (insertError) {
        console.error("Error storing OTP:", insertError);
        return new Response(
          JSON.stringify({ error: "Error storing verification code" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Verification code would be sent via ${channel}`, 
          // Only include OTP in development mode
          development_otp: otp,
          channel: channel
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Using fetch directly instead of the Twilio SDK to avoid prototype issues
    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/`;
    const auth = btoa(`${accountSid}:${authToken}`);
    let twilioResponse;
    
    if (channel === 'sms') {
      // Send SMS
      const twilioParams = new URLSearchParams();
      twilioParams.append('To', phone);
      twilioParams.append('From', twilioPhone);
      twilioParams.append('Body', `Your Reading Orbital verification code is: ${otp}`);
      
      twilioResponse = await fetch(`${twilioEndpoint}Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: twilioParams,
      });
    } else {
      // Make voice call
      // For Twilio Voice using TwiML
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say>Your Reading Orbital verification code is: ${otp.split('').join(', ')}. I repeat, ${otp.split('').join(', ')}.</Say>
        <Pause length="1"/>
        <Say>Your code is ${otp.split('').join(', ')}. Goodbye.</Say>
      </Response>`;
      
      const twilioParams = new URLSearchParams();
      twilioParams.append('To', phone);
      twilioParams.append('From', twilioPhone);
      twilioParams.append('Twiml', twiml);
      
      twilioResponse = await fetch(`${twilioEndpoint}Calls.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: twilioParams,
      });
    }
    
    const twilioData = await twilioResponse.json();
    
    if (!twilioResponse.ok) {
      console.error("Twilio API error:", twilioData);
      throw new Error(`Failed to send ${channel === 'sms' ? 'SMS' : 'voice call'} via Twilio`);
    }
    
    console.log(`${channel === 'sms' ? 'SMS' : 'Voice call'} initiated with SID: ${twilioData.sid}`);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Store OTP in database with expiration (15 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);
    
    const { error: insertError } = await supabase
      .from('phone_verification')
      .upsert([
        { 
          phone: phone,
          otp: otp,
          expires_at: expiresAt.toISOString()
        }
      ]);
    
    if (insertError) {
      console.error("Error storing OTP:", insertError);
      return new Response(
        JSON.stringify({ error: "Error storing verification code" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: channel === 'sms' 
          ? "Verification code sent to your phone" 
          : "You will receive a call shortly with your verification code" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
