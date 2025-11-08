
// netlify/functions/openrouter-proxy.ts
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get the API key from environment variables
  const apiKey = process.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('VITE_OPENROUTER_API_KEY is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');

    console.log('Proxying request to OpenRouter API');

    // Make request to OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://anthonydaccurso.com',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter API error:', response.status, data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: data.error || 'OpenRouter API request failed',
          details: data 
        }),
      };
    }

    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Proxy function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };