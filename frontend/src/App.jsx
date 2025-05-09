import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import LoadingState from './components/LoadingState';
import FeedbackSection from './components/feedback/FeedbackSection';
import ResumePreview from './components/ResumePreview';
import './styles/app.css';

function App() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <h1>Resume Roaster <span className="fire-emoji">🔥</span></h1>
        </div>
        <p className="tagline">Get brutally honest, actionable feedback on your resume</p>
      </header>

      <main className="app-main">
        {!feedback ? (
          <div className="upload-container">
            <UploadForm 
              setFile={setFile}
              file={file}
              setLoading={setLoading}
              setFeedback={setFeedback}
              setResumeText={setResumeText}
            />
          </div>
        ) : (
          <div className="feedback-container">
            <div className="column resume-column">
              <h2>Your Resume</h2>
              <ResumePreview resumeText={resumeText} />
            </div>
            
            <div className="column feedback-column">
              <h2>Feedback</h2>
              {loading ? (
                <LoadingState />
              ) : (
                <FeedbackSection 
                  feedback={feedback}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              )}
            </div>
            
            <div className="column actions-column">
              <h2>Actions</h2>
              <div className="action-buttons">
                <button 
                  className="action-button copy-button"
                  onClick={() => {
                    navigator.clipboard.writeText(feedback);
                    alert('Feedback copied to clipboard!');
                  }}
                >
                  <span className="icon">📋</span> Copy Feedback
                </button>
                
                <button 
                  className="action-button new-resume-button"
                  onClick={() => {
                    setFeedback(null);
                    setFile(null);
                    setResumeText("");
                  }}
                >
                  <span className="icon">📄</span> Analyze New Resume
                </button>
              </div>
              
              <div className="tips-container">
                <h3>Pro Tips</h3>
                <ul className="tips-list">
                  <li><span className="tip-badge good">✅</span> Focus on quantifiable achievements</li>
                  <li><span className="tip-badge warning">⚠️</span> Avoid generic statements</li>
                  <li><span className="tip-badge danger">❌</span> Don't include irrelevant experience</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Built with FastAPI, React, and DeepSeek AI • <a href="https://github.com/nismafaaa/resume-roaster" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </footer>
    </div>
  );
}

export default App;