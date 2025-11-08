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

export const askAnt = async (userMessage: string) => {
  const isDev = import.meta.env.DEV;
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (isDev && (!apiKey || apiKey === 'sk-your-secret-key')) {
    throw new Error(
      'Ask Ant requires an OpenRouter API key. ' +
      'Add VITE_OPENROUTER_API_KEY to your .env file or run "netlify dev" to use the proxy. ' +
      'Get your API key from https://openrouter.ai/'
    );
  }

  let response: Response;

  if (isDev && apiKey) {
    console.log('Using direct OpenRouter API in development');
    response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://anthonydaccurso.com',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        max_tokens: 150,
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
      }),
    });
  } else {
    console.log('Using Netlify proxy function');
    response = await fetch('/.netlify/functions/openrouter-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        max_tokens: 150,
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
      }),
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Ask Ant Error: ${response.status}`);
    console.error('Error details:', errorText.substring(0, 500));
    
    // Try to parse error as JSON
    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error) {
        throw new Error(`AI Error: ${errorData.error}`);
      }
    } catch (e) {
      // Not JSON, continue with generic error
    }
    
    throw new Error(`Unable to reach Ask Ant (Status ${response.status}). Please try again later.`);
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

  return data.choices[0].message.content;
};