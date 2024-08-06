'use client';

import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Container, Paper, LinearProgress, Grid, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import BusinessInfo from './BusinessInfo';
import ChatbotCustomization from './ChatbotCustomization';
import DataUpload from './DataUpload';
import Review from './Review';
import ChatbotPreview from './ChatbotPreview';
import { FaRobot, FaBriefcase, FaPalette, FaUpload, FaClipboardCheck, FaEye } from 'react-icons/fa';

const steps = ['Welcome', 'Business Info', 'Customization', 'Data Upload', 'Review', 'Preview'];

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '20px',
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          height: '8px',
        },
      },
    },
  },
});

const ChatbotCreator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    chatbotName: '',
    primaryColor: '#000000',
    welcomeMessage: '',
    files: [],
    fileContent: '',
  });

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleFormChange = (field: string, value: any) => setFormData((prevData) => ({ ...prevData, [field]: value }));

  const getStepContent = (step: number) => {
    switch (step) {
      case 0: return <LandingPage onNext={handleNext} />;
      case 1: return <BusinessInfo formData={formData} onChange={handleFormChange} />;
      case 2: return <ChatbotCustomization formData={formData} onChange={handleFormChange} />;
      case 3: return <DataUpload formData={formData} onChange={handleFormChange} />;
      case 4: return <Review formData={formData} />;
      case 5: return <ChatbotPreview formData={formData} />;
      default: return 'Unknown step';
    }
  };

  const stepIcons = [
    <FaRobot key="welcome" />,
    <FaBriefcase key="business" />,
    <FaPalette key="customization" />,
    <FaUpload key="upload" />,
    <FaClipboardCheck key="review" />,
    <FaEye key="preview" />
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
            AI Chatbot Creator
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Grid item xs={6} sm={4} md={2} key={label}>
                <Paper
                  elevation={activeStep === index ? 3 : 1}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: activeStep === index ? 'primary.main' : 'background.paper',
                    color: activeStep === index ? 'primary.contrastText' : 'text.primary',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconButton
                    color={activeStep === index ? 'inherit' : 'primary'}
                    sx={{ mb: 1, fontSize: '2rem' }}
                  >
                    {stepIcons[index]}
                  </IconButton>
                  <Typography variant="body2">{label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <LinearProgress
            variant="determinate"
            value={(activeStep / (steps.length - 1)) * 100}
            sx={{ mb: 4, height: 8, borderRadius: '4px' }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ minHeight: '400px', mb: 4 }}>
                {getStepContent(activeStep)}
              </Box>
            </motion.div>
          </AnimatePresence>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<FaRobot />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  console.log('Finished!', formData);
                } else {
                  handleNext();
                }
              }}
              endIcon={<FaRobot />}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ChatbotCreator;