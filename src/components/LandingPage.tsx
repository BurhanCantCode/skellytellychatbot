'use client';

import React from 'react';
import { Typography, Button, Box, Paper, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            AI Chatbot Creator
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, color: 'text.secondary' }}>
            Create your personalized AI-powered chatbot for customer support in minutes
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {[
            { icon: <AutoAwesomeIcon />, text: "Customizable personality" },
            { icon: <SupportAgentIcon />, text: "24/7 customer support" },
            { icon: <SettingsIcon />, text: "Easy setup and management" },
            { icon: <SmartToyIcon />, text: "Advanced AI technology" },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'background.paper' }}>
                  <Box sx={{ color: 'primary.main', fontSize: 40, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="body1">{feature.text}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onNext}
            startIcon={<RocketLaunchIcon />}
            sx={{ fontSize: '1.2rem', padding: '12px 24px', borderRadius: '50px' }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default LandingPage;