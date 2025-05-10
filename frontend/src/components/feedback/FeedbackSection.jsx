import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackSection = ({ feedback, activeSection, setActiveSection }) => {
  // Parse feedback into sections using markdown headers
  const parseFeedback = (feedbackText) => {
    const sectionOrder = [
      { key: 'general', header: '# Vibe Check', title: 'Vibe Check', type: 'info' },
      { key: 'strengths', header: '# What Slaps', title: 'What Slaps', type: 'success' },
      { key: 'weaknesses', header: '# Could Be Better', title: 'Red Flags', type: 'warning' },
      { key: 'actionItems', header: '# Fix This Stuff', title: 'Make It Better', type: 'danger' }
    ];
    const sections = {};
    if (!feedbackText) {
      sectionOrder.forEach(({ key, title, type }) => {
        sections[key] = { title, content: "No feedback provided.", type };
      });
      return sections;
    }
    // Updated regex to match new headers
    const regex = /# (Vibe Check|What Slaps|Could Be Better|Fix This Stuff)\s*([\s\S]*?)(?=(?:\n# (?:Vibe Check|What Slaps|Could Be Better|Fix This Stuff))|$)/g;
    let match;
    while ((match = regex.exec(feedbackText)) !== null) {
      const header = match[1];
      const content = match[2].trim();
      const section = sectionOrder.find(s => s.header === `# ${header}`);
      if (section) {
        sections[section.key] = { title: section.title, content, type: section.type };
      }
    }
    // Fill missing sections with a default message
    sectionOrder.forEach(({ key, title, type }) => {
      if (!sections[key] || !sections[key].content) {
        sections[key] = { title, content: "No feedback provided.", type };
      }
    });
    return sections;
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