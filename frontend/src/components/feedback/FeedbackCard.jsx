import React from 'react';

const FeedbackCard = ({ title, content, type }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'danger':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };
  
  return (
    <div className={`feedback-card ${type}`}>
      <div className="card-header">
        <span className="card-icon">{getTypeIcon(type)}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">
        {content.split('\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default FeedbackCard;