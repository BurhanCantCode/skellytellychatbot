import fetch from 'isomorphic-fetch';

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateChatbotResponse(prompt: string, businessData: any, maxRetries = 3): Promise<string> {
  if (!apiKey) {
    console.error("GROQ API key is not configured.");
    return 'Failed to generate a response due to configuration issues.';
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
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
            { role: "system", content: `You are a helpful assistant for ${businessData.businessName}, a company in the ${businessData.industry} industry. Your name is ${businessData.chatbotName}. Use the provided business information to answer user queries accurately.` },
            { role: "user", content: `Here's some context about the business: ${JSON.stringify(businessData)}` },
            { role: "user", content: `Here's the CSV data:\n${businessData.csvData}` },
            { role: "user", content: prompt }
          ],
          max_tokens: 1000
        }),
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        await new Promise(resolve => setTimeout(resolve, (parseInt(retryAfter || '5') + 1) * 1000));
        continue;
      }

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
      console.error(`Error generating chatbot response (attempt ${attempt + 1}):`, error);
      if (attempt === maxRetries - 1) {
        return 'Failed to generate a response after multiple attempts.';
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  return 'Failed to generate a response.';
}