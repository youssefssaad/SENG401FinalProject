import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSignInAlt, faTasks, faEye, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";

// Data structure for sections
const sections = [
  {
    icon: faGlobe,
    title: "Navigate to this website",
    description: "Your money’s always making more with low-fee investing and high-interest savings."
  },
  {
    icon: faSignInAlt,
    title: "Click the button above to sign up or log in",
    description: "Get sophisticated investment opportunities traditionally reserved for industry insiders and the ultra-wealthy."
  },
  {
    icon: faTasks,
    title: "Set your goals by filling out the expenses page with all your percentages",
    description: "In just a few taps, set your financial goals in motion, and let our easy-to-use products handle the rest."
  },
  {
    icon: faEye,
    title: "Keep an eye on your budget summaries in the budget page",
    description: "Maximize your earnings with our innovative financial tools and expert advice."
  },
  {
    icon: faGraduationCap,
    title: "Since we know learning is always the key to success, checkout the education page for articles",
    description: "Empower your financial knowledge with our comprehensive educational resources."
  }
];

const MainInst = () => {
    return (
      <section className="main-page-inst">
        <h2>How It Works</h2>
        <div className="inst-container">
          <div className="inst-sections">
            {sections.map((section, index) => (
              <div key={index} className="inst-subsection">
                <FontAwesomeIcon icon={section.icon} size="2x" />
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
          <div className="inst-image">
            <img src={logo} alt="WealthWave Logo" />
          </div>
        </div>
      </section>
    );
  }
  
  export default MainInst;
