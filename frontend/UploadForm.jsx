import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ setFile, file, loading, setLoading, setFeedback, setResumeText }) => {
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are supported');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== 'application/pdf') {
        setError('Only PDF files are supported');
        return;
      }
      setFile(droppedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a resume file');
      return;
    }

    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Changed URL to relative path for proxy usage
      const response = await axios.post('/review-resume/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Get the text content of the PDF to display in the preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Store the raw text for preview
          setResumeText("Your resume text will appear here");
          setFeedback(response.data.feedback);
        } catch (error) {
          console.error('Error reading PDF text:', error);
        }
      };
      reader.readAsArrayBuffer(file);
      
    } catch (err) {
      console.error('Full error response:', err.response); // Added extra logging
      setError(err.response?.data?.detail || 'An error occurred while processing your resume');
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <div className="upload-card">
        <h2>Upload Your Resume</h2>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div 
            className={`dropzone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="resume-upload" 
              onChange={handleFileChange}
              accept="application/pdf"
              className="file-input"
            />
            
            <label htmlFor="resume-upload" className="file-label">
              {file ? (
                <>
                  <div className="file-icon">📄</div>
                  <div className="file-name">{file.name}</div>
                </>
              ) : (
                <>
                  <div className="upload-icon">📤</div>
                  <div className="upload-text">
                    <strong>Drag & drop</strong> your resume here<br />
                    or <strong>click to browse</strong>
                  </div>
                  <div className="upload-hint">(PDF files only)</div>
                </>
              )}
            </label>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={!file || loading}
          >
            {loading ? 'Analyzing...' : 'Roast My Resume 🔥'}
          </button>
        </form>
        
        <div className="upload-info">
          <div className="info-item">
            <div className="info-icon">🔒</div>
            <div className="info-text">Your resume is processed securely</div>
          </div>
          <div className="info-item">
            <div className="info-icon">⚡</div>
            <div className="info-text">Get detailed feedback in seconds</div>
          </div>
          <div className="info-item">
            <div className="info-icon">🎯</div>
            <div className="info-text">Actionable advice to improve your chances</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;