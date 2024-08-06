import fetch from 'isomorphic-fetch';

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateChatbotResponse(prompt: string): Promise<string> {
  if (!apiKey) {
    console.error("GROQ API key is not configured.");
    return 'Failed to generate a response due to configuration issues.';
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: "system", content: "You are a helpful assistant that responds with cute human-like emotions. Aww and stuff! You don't respond with continual texts like 'maybe I can do something'. Instead, you give a complete answer." },
          { role: "user", content: prompt }
        ],
        max_tokens: 100
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content || 'No valid response received.';
    } else {
      return 'No valid response received.';
    }
  } catch (error) {
    console.error('Error generating chatbot response:', error);
    return 'Failed to generate a response.';
  }
}