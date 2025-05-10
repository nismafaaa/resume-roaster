import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Roasting in progress... prepping the AI flamethrower 🔥",
  "Analyzing your career choices... no judgment (maybe a little) 👀",
  "Scanning for buzzwords to ruthlessly eliminate ✂️",
  "Finding the perfect balance between harsh and helpful 📊",
  "Comparing your resume to thousands of successful ones 📈",
  "Preparing to tell you what recruiters won't 🙊",
  "Formulating advice your career counselor was too nice to give 📝"
];

const LoadingState = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{loadingMessages[messageIndex]}</p>
    </div>
  );
};

export default LoadingState;