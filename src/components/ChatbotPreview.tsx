import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { generateChatbotResponse } from '../utils/groq';

interface ChatbotPreviewProps {
  formData: any;
}

const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({ formData }) => {
  const [messages, setMessages] = useState([
    { text: formData.welcomeMessage, sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      
      const botResponse = await generateChatbotResponse(input, formData);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#e94560', fontWeight: 'bold', mb: 4 }}>
          Preview Your Chatbot
        </Typography>
      </motion.div>
      <Paper elevation={3} sx={{ borderRadius: '24px', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: formData.primaryColor, p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#fff', color: formData.primaryColor, mr: 2 }}>
            {formData.chatbotName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
            {formData.chatbotName}
          </Typography>
        </Box>
        <Box sx={{ height: '400px', overflowY: 'auto', p: 3, bgcolor: '#f5f5f5' }}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                    bgcolor: message.sender === 'user' ? formData.primaryColor : '#fff',
                    color: message.sender === 'user' ? '#fff' : 'text.primary',
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Paper>
              </Box>
            </motion.div>
          ))}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleSend}>Send</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatbotPreview;