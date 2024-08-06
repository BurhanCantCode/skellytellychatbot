'use client';

import React from 'react';
import { TextField, Box, Typography, Paper, Grid, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MessageIcon from '@mui/icons-material/Message';

interface ChatbotCustomizationProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const ChatbotCustomization: React.FC<ChatbotCustomizationProps> = ({ formData, onChange }) => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#e94560', fontWeight: 'bold', mb: 4 }}>
          Customize Your Chatbot
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
              Chatbot Name
            </Typography>
            <TextField
              fullWidth
              value={formData.chatbotName}
              onChange={(e) => onChange('chatbotName', e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ChatBubbleOutlineIcon sx={{ color: '#e94560' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
              Primary Color
            </Typography>
            <TextField
              fullWidth
              label="Primary Color"
              type="color"
              value={formData.primaryColor}
              onChange={(color) => onChange('primaryColor', color.css.backgroundColor)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ColorLensIcon sx={{ color: '#e94560' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
              Welcome Message
            </Typography>
            <TextField
              fullWidth
              value={formData.welcomeMessage}
              onChange={(e) => onChange('welcomeMessage', e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon sx={{ color: '#e94560' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatbotCustomization;