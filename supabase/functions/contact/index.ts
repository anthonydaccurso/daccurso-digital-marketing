import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactData {
  name: string;
  email: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name) && name.trim().length > 0;
}

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, (char) => {
    const entities: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    };
    return entities[char] || char;
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method Not Allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const data: ContactData = await req.json();

    const name = data.name?.trim() || "";
    const email = data.email?.trim() || "";
    const message = data.message?.trim() || "";

    if (!validateName(name)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please enter a valid name (letters, spaces, hyphens, and apostrophes only)."
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please enter a valid email address."
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message must be between 10 and 1000 characters."
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const sanitizedData = {
      name: sanitize(name),
      email: email.toLowerCase(),
      message: sanitize(message)
    };

    console.log("Contact form submission:", { name: sanitizedData.name, email: sanitizedData.email });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! I will get back to you soon."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while processing your request. Please try again later."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
