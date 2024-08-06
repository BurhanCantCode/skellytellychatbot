import { generateChatbotResponse as fetchChatbotResponse } from './openai';

export const generateChatbotResponse = async (prompt: string) => {
  try {
    const response = await fetchChatbotResponse(prompt);
    return response || 'No valid response received.';
  } catch (error) {
    console.error('Error generating chatbot response:', error);
    return 'Failed to generate a response.';
  }
};