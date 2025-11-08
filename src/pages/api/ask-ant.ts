import {
  aboutMeText,
  projects,
  services,
  skillCategories,
  contactItems,
  socialDescription,
} from '../../constants/data';

const serviceDetails = services
  .map((s) => `${s.title} ($${s.price}): ${s.description}`)
  .join('\n\n');

const projectSummaries = projects
  .map((p) => `${p.title}: ${p.description}`)
  .join('\n\n');

const skillsList = skillCategories
  .map((cat) => `${cat.name}: ${cat.skills.join(', ')}`)
  .join('\n');

const contactList = contactItems.map((c) => `${c.title}: ${c.url}`).join('\n');

const systemPrompt = `
You are Ask Ant — a friendly, helpful chatbot assistant who speaks like Anthony Daccurso. You're slightly casual, mostly professional, and use contractions like I'm, you're, don't, etc.

====================
ABOUT ANTHONY
====================
${aboutMeText}

====================
SERVICES
====================
${serviceDetails}

====================
PROJECTS
====================
${projectSummaries}

====================
SKILLS
====================
${skillsList}

====================
CONTACT INFO
====================
${contactList}

====================
SOCIAL PRESENCE
====================
${socialDescription}

Always respond concisely, clearly, conversationally, and professionally.
Keep replies under 100 words unless the user asks for more detail.
Seamlessly fit your thoughts within the word limit.
Answer naturally — like Anthony would.
`.trim();

// Helper function to detect device type
const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown' = 'unknown';
  let deviceName = 'Unknown Device';
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  // Detect OS
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  // Detect Browser
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  // Detect Device Type
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'tablet';
    deviceName = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    deviceType = 'mobile';
    if (ua.includes('iPhone')) deviceName = 'iPhone';
    else if (ua.includes('iPad')) deviceName = 'iPad';
    else if (ua.includes('Android')) deviceName = 'Android Device';
    else deviceName = 'Mobile Device';
  } else {
    deviceType = 'desktop';
    deviceName = `${browser} on ${os}`;
  }

  return {
    deviceType,
    deviceName,
    browser,
    os,
    userAgent: ua,
  };
};

// Helper function to generate/retrieve session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
};

// Helper function to generate/retrieve conversation ID
const getConversationId = () => {
  let conversationId = sessionStorage.getItem('conversation_id');
  if (!conversationId) {
    conversationId = crypto.randomUUID();
    sessionStorage.setItem('conversation_id', conversationId);
  }
  return conversationId;
};

export const askAnt = async (userMessage: string) => {
  const isDev = import.meta.env.DEV;
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const startTime = Date.now();

  console.log('Ask Ant started');
  console.log('Message length:', userMessage.length);
  console.log('Mode:', isDev ? 'Development' : 'Production');

  if (isDev && (!apiKey || apiKey === 'sk-your-secret-key')) {
    throw new Error(
      'Ask Ant requires an OpenRouter API key. ' +
      'Add VITE_OPENROUTER_API_KEY to your .env file or run "netlify dev" to use the proxy. ' +
      'Get your API key from https://openrouter.ai/'
    );
  }

  let response: Response;
  const requestBody = {
    model: 'mistralai/mistral-7b-instruct:free',
    max_tokens: 300, // Increased from 150 for longer responses
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  };

  try {
    if (isDev && apiKey) {
      console.log('Using direct OpenRouter API in development');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://anthonydaccurso.com',
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out after 30 seconds. Please try a shorter question.');
        }
        throw fetchError;
      }
    } else {
      console.log('📡 Using Netlify proxy function');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        response = await fetch('/.netlify/functions/openrouter-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out after 30 seconds. Please try a shorter question.');
        }
        throw fetchError;
      }
    }

    console.log('Response status:', response.status);
    const responseTime = Date.now() - startTime;
    console.log('Response time:', responseTime, 'ms');

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Ask Ant Error: ${response.status}`);
      console.error('Error details:', errorText.substring(0, 500));
      
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error) {
          if (errorData.error.includes('rate limit')) {
            throw new Error('Too many requests. Please wait a moment and try again.');
          }
          throw new Error(`AI Error: ${errorData.error}`);
        }
      } catch (e) {
        // Not JSON, continue with generic error
      }
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      
      if (response.status === 502 || response.status === 504) {
        throw new Error('Service temporarily unavailable. Please try again in a moment.');
      }
      
      throw new Error(`Unable to reach Ask Ant (Status ${response.status}). Please try again.`);
    }

    const data = await response.json();

    if (data.error) {
      console.error('Ask Ant Error:', data.error);
      throw new Error('Ask Ant is temporarily unavailable. Please try again later.');
    }

    if (!data.choices || !data.choices.length) {
      console.error('Ask Ant returned no response.');
      throw new Error('Ask Ant did not return a response. Please try again.');
    }

    const botResponse = data.choices[0].message.content;
    console.log('Response received, length:', botResponse.length);

    // Log the conversation to Supabase (fire and forget - don't block UI)
    logConversation(userMessage, botResponse, responseTime).catch(err => {
      console.error('Failed to log conversation:', err);
      // Don't throw - we don't want logging failures to break the chat
    });

    return botResponse;

  } catch (error) {
    console.error('Ask Ant error:', error);
    throw error;
  }
};

// Separate function to log conversation to Supabase
async function logConversation(userMessage: string, botResponse: string, responseTime: number) {
  try {
    const deviceInfo = getDeviceInfo();
    const sessionId = getSessionId();
    const conversationId = getConversationId();

    // Get location data from ipapi.co (free tier: 1000 requests/day)
    let locationData = {
      ip_address: null,
      country: null,
      region: null,
      city: null,
      latitude: null,
      longitude: null,
    };

    try {
      const locationResponse = await fetch('https://ipapi.co/json/');
      if (locationResponse.ok) {
        const location = await locationResponse.json();
        locationData = {
          ip_address: location.ip,
          country: location.country_name,
          region: location.region,
          city: location.city,
          latitude: location.latitude,
          longitude: location.longitude,
        };
      }
    } catch (locError) {
      console.warn('Could not fetch location data:', locError);
    }

    // Log to Netlify function which will save to Supabase
    await fetch('/.netlify/functions/log-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_message: userMessage,
        bot_response: botResponse,
        conversation_id: conversationId,
        device_type: deviceInfo.deviceType,
        device_name: deviceInfo.deviceName,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        user_agent: deviceInfo.userAgent,
        referrer: document.referrer || null,
        session_id: sessionId,
        response_time_ms: responseTime,
        ...locationData,
      }),
    });
  } catch (error) {
    console.error('Error logging conversation:', error);
  }
}