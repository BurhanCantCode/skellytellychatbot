'use client';

import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';

interface ReviewProps {
  formData: any;
}

const Review: React.FC<ReviewProps> = ({ formData }) => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Review Your Chatbot
        </Typography>
      </motion.div>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom>Business Information</Typography>
              <Typography><strong>Name:</strong> {formData.businessName}</Typography>
              <Typography><strong>Industry:</strong> {formData.industry}</Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h6" gutterBottom>Chatbot Customization</Typography>
              <Typography><strong>Name:</strong> {formData.chatbotName}</Typography>
              <Typography><strong>Primary Color:</strong> {formData.primaryColor}</Typography>
              <Typography><strong>Welcome Message:</strong> {formData.welcomeMessage}</Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Typography variant="h6" gutterBottom>Uploaded Data</Typography>
              <Typography>{formData.files.length > 0 ? `File: ${formData.files[0].name}` : 'No file uploaded'}</Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Review;