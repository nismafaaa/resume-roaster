import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackSection = ({ feedback, activeSection, setActiveSection }) => {
  // Function to parse feedback into sections (this is a simplified version)
  const parseFeedback = (feedbackText) => {
    // Split feedback by numbered points or headers
    const sections = feedbackText.split(/\n(?=\d+\.|\#)/);
    
    // Create structured feedback sections (simplified example)
    return {
      general: {
        title: "General Impression",
        content: sections[0] || "No general feedback provided",
        type: "info"
      },
      strengths: {
        title: "Strengths",
        content: sections.find(s => s.toLowerCase().includes("strength")) || "No strengths identified",
        type: "success"
      },
      weaknesses: {
        title: "Areas for Improvement",
        content: sections.find(s => s.toLowerCase().includes("improve") || s.toLowerCase().includes("weak")) || "No improvement areas identified",
        type: "warning"
      },
      actionItems: {
        title: "Action Items",
        content: sections.find(s => s.toLowerCase().includes("action") || s.toLowerCase().includes("step")) || "No specific action items provided",
        type: "danger"
      }
    };
  };
  
  const feedbackSections = parseFeedback(feedback);
  
  return (
    <div className="feedback-section">
      <div className="feedback-tabs">
        {Object.keys(feedbackSections).map((sectionKey) => (
          <button
            key={sectionKey}
            className={`feedback-tab ${activeSection === sectionKey ? 'active' : ''}`}
            onClick={() => setActiveSection(sectionKey)}
          >
            {feedbackSections[sectionKey].title}
          </button>
        ))}
      </div>
      
      <div className="feedback-content">
        <FeedbackCard
          title={feedbackSections[activeSection].title}
          content={feedbackSections[activeSection].content}
          type={feedbackSections[activeSection].type}
        />
      </div>
    </div>
  );
};

export default FeedbackSection;