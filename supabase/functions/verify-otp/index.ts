
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { phone, otp } = await req.json();
    
    if (!phone || !otp) {
      return new Response(
        JSON.stringify({ error: "Phone number and OTP are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Validate Indian phone number
    const indianPhoneRegex = /^\+91[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid Indian phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // In development mode, accept any 6-digit OTP
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      console.log(`Development mode: Accepting OTP ${otp} for ${phone}`);
      
      // Return success response
      return new Response(
        JSON.stringify({ valid: true, message: "Verification successful" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // If not a valid 6-digit OTP
    return new Response(
      JSON.stringify({ valid: false, message: "Invalid verification code" }),
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
