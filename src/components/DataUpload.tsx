import React, { useCallback } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

interface DataUploadProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const DataUpload: React.FC<DataUploadProps> = ({ formData, onChange }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    Papa.parse(file, {
      complete: (result) => {
        const csvData = result.data;
        const csvString = csvData.map(row => row.join(',')).join('\n');
        onChange('csvData', csvString);
        onChange('files', [file]);
      },
      header: true,
    });
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.csv' });

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Upload Your Data
        </Typography>
      </motion.div>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: '12px',
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop the CSV file here' : 'Drag and drop your CSV file here, or click to select'}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Select File
            </Button>
          </Box>
        </motion.div>
        {formData.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="body1" sx={{ mt: 2 }}>
              File uploaded: {formData.files[0].name}
            </Typography>
          </motion.div>
        )}
      </Paper>
    </Box>
  );
};

export default DataUpload;