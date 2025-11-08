
// netlify/functions/openrouter-proxy.mjs
// Note: .mjs extension for ES Module compatibility

export const handler = async (event, context) => {
  console.log('=== OpenRouter Proxy Function Started ===');
  console.log('Method:', event.httpMethod);
  console.log('Time:', new Date().toISOString());

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check for API key
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;
    
    console.log('API Key exists:', !!apiKey);
    console.log('API Key prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'MISSING');

    if (!apiKey) {
      console.error('No API key found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server configuration error',
          message: 'API key not configured'
        }),
      };
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body || '{}');
      console.log('Request body parsed successfully');
      console.log('Model:', requestBody.model);
      console.log('Max tokens:', requestBody.max_tokens);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid request body',
          message: 'Body must be valid JSON'
        }),
      };
    }

    // Make request to OpenRouter
    console.log('📡 Calling OpenRouter API...');
    
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://anthonydaccurso.com',
        'X-Title': 'Anthony Daccurso Portfolio',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('OpenRouter response status:', openRouterResponse.status);

    // Get response text first for debugging
    const responseText = await openRouterResponse.text();
    console.log('Response text length:', responseText.length);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Failed to parse OpenRouter response as JSON');
      console.error('Response text:', responseText.substring(0, 500));
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid response from AI service',
          message: 'Received non-JSON response'
        }),
      };
    }

    // Check if request was successful
    if (!openRouterResponse.ok) {
      console.error('OpenRouter API error:', openRouterResponse.status);
      console.error('Error data:', data);
      return {
        statusCode: openRouterResponse.status,
        headers,
        body: JSON.stringify({ 
          error: data.error?.message || 'AI service error',
          details: data
        }),
      };
    }

    // Success!
    console.log('OpenRouter request successful');
    console.log('Choices returned:', data.choices?.length || 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Unexpected error in proxy function:');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        type: error?.constructor?.name || 'Unknown'
      }),
    };
  }
};