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
        <p className="tagline">We’ll hit you with real, actionable feedback that actually helps you stand out. No fluff, just facts.</p>
      </header>

      <main className="app-main">
        {loading ? (
          <LoadingState />
        ) : !feedback ? (
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
            <div className="column feedback-column">
              <h2>Feedback</h2>
              <FeedbackSection 
                feedback={feedback}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
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
                  <li>
                    <span className="tip-badge good">✅</span>
                    <span className="tip-content">
                      <span className="tip-title">
                        Flex With Facts
                      </span>
                      <span className="tip-desc">
                        Drop numbers. "Increased sales by 42%" hits harder than "helped with marketing."
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="tip-badge good">✅</span>
                    <span className="tip-content">
                      <span className="tip-title">
                        Cut the Buzzwords
                      </span>
                      <span className="tip-desc">
                        "Hardworking, passionate team player"? Yeah, so is everyone. Say what you did.
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="tip-badge good">✅</span>
                    <span className="tip-content">
                      <span className="tip-title">
                        Keep It Relevant
                      </span>
                      <span className="tip-desc">
                        Your panitia experience doesn’t belong unless it actually relates to the job. Stay on target.
                      </span>
                    </span>
                  </li>
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