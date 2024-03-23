import React from 'react';

function EducationItem({ link, imageSrc, altText, description }) {
  return (
    <div className="education-item">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img className="education-image" src={imageSrc} alt={altText} />
        <p>{description}</p>
      </a>
    </div>
  );
}

export default EducationItem;
