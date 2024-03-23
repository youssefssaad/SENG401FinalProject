import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSignInAlt, faTasks, faEye, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";

// Data structure for sections
const sections = [
  {
    icon: faGlobe,
    title: "Navigate to this website",
    description: "This is the easiest and most important step."
  },
  {
    icon: faSignInAlt,
    title: "Click the button above to sign up or log in",
    description: "Increase your chances of savings. We all know how hard it is to blindly manage money."
  },
  {
    icon: faTasks,
    title: "Set your goals by filling out the expenses page with all your percentages",
    description: "We know numbers get difficult past 74, so why not use a big pie chart. Who doesn't like pie? (me) :("
  },
  {
    icon: faEye,
    title: "Keep an eye on your budget summaries in the budget page",
    description: "Keep monitoring your progress!"
  },
  {
    icon: faGraduationCap,
    title: "As someone said, learning is great!!",
    description: "Since we know learning is always the key to success, checkout the education page for articles"
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
