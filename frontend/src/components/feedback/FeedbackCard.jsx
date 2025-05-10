import React from 'react';
import ReactMarkdown from 'react-markdown';

const FeedbackCard = ({ title, content, type }) => (
  <div className={`feedback-card ${type}`}>
    <div className="card-header">
      <span className="card-icon">
        {type === "success" && "✅"}
        {type === "warning" && "⚠️"}
        {type === "danger" && "🔧"}
        {type === "info" && "💡"}
      </span>
      <h3 className="card-title">{title}</h3>
    </div>
    <div className="card-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </div>
);

export default FeedbackCard;