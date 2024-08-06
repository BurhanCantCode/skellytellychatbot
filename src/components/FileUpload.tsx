import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

interface FileUploadProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ formData, onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onChange('files', Array.from(event.target.files));
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          Upload Files
        </Typography>
      </motion.div>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Files
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </Button>
          {formData.files.length > 0 && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {formData.files.length} file(s) selected
            </Typography>
          )}
        </motion.div>
      </Paper>
    </Box>
  );
};

export default FileUpload;