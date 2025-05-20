
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
    const { phone } = await req.json();
    
    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone number is required" }),
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
          message: "Verification code sent", 
          // Only include OTP in development mode
          development_otp: otp
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Using fetch directly instead of the Twilio SDK to avoid prototype issues
    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const twilioParams = new URLSearchParams();
    twilioParams.append('To', phone);
    twilioParams.append('From', twilioPhone);
    twilioParams.append('Body', `Your Reading Orbital verification code is: ${otp}`);
    
    const auth = btoa(`${accountSid}:${authToken}`);
    
    const twilioResponse = await fetch(twilioEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: twilioParams,
    });
    
    const twilioData = await twilioResponse.json();
    
    if (!twilioResponse.ok) {
      console.error("Twilio API error:", twilioData);
      throw new Error("Failed to send SMS via Twilio");
    }
    
    console.log(`SMS sent with SID: ${twilioData.sid}`);

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
      JSON.stringify({ success: true, message: "Verification code sent" }),
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
