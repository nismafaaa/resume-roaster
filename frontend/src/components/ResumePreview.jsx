import React from 'react';

const ResumePreview = ({ resumeText }) => {
  return (
    <div className="resume-preview">
      <div className="resume-content">
        <pre>{resumeText || "Resume preview will appear here"}</pre>
      </div>
    </div>
  );
};

export default ResumePreview;