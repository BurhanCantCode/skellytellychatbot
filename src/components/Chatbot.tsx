import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { generateChatbotResponse } from '../utils/groq';

interface ChatbotProps {
  businessData: any;
}

const Chatbot: React.FC<ChatbotProps> = ({ businessData }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      
      const response = await generateChatbotResponse(input, businessData);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
      <Paper elevation={3} sx={{ height: 400, overflow: 'auto', p: 2, mb: 2 }}>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                textAlign: message.isUser ? 'right' : 'left',
                color: message.isUser ? 'primary.main' : 'text.primary',
              }}
            >
              {message.text}
            </Typography>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;