import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  console.log("=== OpenRouter Proxy Function Started ===");
  console.log("Method:", req.method);
  console.log("Time:", new Date().toISOString());

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const apiKey = Deno.env.get("OPENROUTER_API_KEY");

    console.log("API Key exists:", !!apiKey);

    if (!apiKey) {
      console.error("No API key found in environment variables");
      return new Response(
        JSON.stringify({
          error: "Server configuration error",
          message: "API key not configured"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Request body parsed successfully");
      console.log("Model:", requestBody.model);
      console.log("Max tokens:", requestBody.max_tokens);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          message: "Body must be valid JSON"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Calling OpenRouter API...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    let openRouterResponse;
    try {
      openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://anthonydaccurso.com",
          "X-Title": "Anthony Daccurso Portfolio",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === "AbortError") {
        console.error("Request timed out after 25 seconds");
        return new Response(
          JSON.stringify({
            error: "Request timeout",
            message: "The AI service took too long to respond. Please try a simpler question."
          }),
          {
            status: 504,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw fetchError;
    }

    console.log("OpenRouter response status:", openRouterResponse.status);

    const responseText = await openRouterResponse.text();
    console.log("Response text length:", responseText.length);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("Failed to parse OpenRouter response as JSON");
      console.error("Response text:", responseText.substring(0, 500));
      return new Response(
        JSON.stringify({
          error: "Invalid response from AI service",
          message: "Received non-JSON response"
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!openRouterResponse.ok) {
      console.error("OpenRouter API error:", openRouterResponse.status);
      console.error("Error data:", data);
      return new Response(
        JSON.stringify({
          error: data.error?.message || "AI service error",
          details: data
        }),
        {
          status: openRouterResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("OpenRouter request successful");
    console.log("Choices returned:", data.choices?.length || 0);

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Unexpected error in proxy function:");
    console.error("Error type:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        type: error?.constructor?.name || "Unknown"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
