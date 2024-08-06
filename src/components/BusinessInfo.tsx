'use client';

import React from 'react';
import { TextField, Box, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';

interface BusinessInfoProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ formData, onChange }) => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Tell Us About Your Business
        </Typography>
      </motion.div>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextField
                fullWidth
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => onChange('businessName', e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TextField
                fullWidth
                label="Industry"
                value={formData.industry}
                onChange={(e) => onChange('industry', e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default BusinessInfo;