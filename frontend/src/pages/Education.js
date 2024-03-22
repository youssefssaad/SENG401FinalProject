import React from 'react';
import Navbar from '../components/Navbar';
import budgetImage from '../assets/BudgetImage.jpg';
import savingImage from '../assets/SavingImage.jpg';
import debtManageImage from '../assets/DebtManagementImage.png';
import insauranceImage from '../assets/InsauranceImage.jpeg';
import investmentImage from '../assets/InvestmentImage.jpg';
import retirementImage from '../assets/RetirementImage.jpg';
import taxImage from '../assets/TaxImage.jpeg';
import emergencyFundImage from '../assets/EmergencyFundsImage.jpg';

// EducationItem component
function EducationItem({ href, imgSrc, imgAlt, text }) {
  return (
    <div className="education-item">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img className="education-image" src={imgSrc} alt={imgAlt} />
        <p>{text}</p>
      </a>
    </div>
  );
}

function Education() {
  const educationItems = [
    { href: 'https://www.nerdwallet.com/ca/personal-finance/how-to-budget', imgSrc: budgetImage, imgAlt: 'Budgeting', text: 'Budgeting' },
    { href: 'https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/ways-to-save-money', imgSrc: savingImage, imgAlt: 'Saving', text: 'Saving' },
    { href: 'https://fortune.com/recommends/investing/how-to-start-investing/', imgSrc: investmentImage, imgAlt: 'Investing', text: 'Investing' },
    { href: 'https://www.canada.ca/en/financial-consumer-agency/services/debt/plan-debt-free.html', imgSrc: debtManageImage, imgAlt: 'Debt Management', text: 'Debt Management' },
    { href: 'https://www.investopedia.com/terms/r/retirement-planning.asp', imgSrc: retirementImage, imgAlt: 'Retirement Planning', text: 'Retirement Planning' },
    { href: 'https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/understanding-taxes-benefits.html', imgSrc: taxImage, imgAlt: 'Taxes', text: 'Taxes' },
    { href: 'https://www.ibc.ca/insurance-basics/how-insurance-works', imgSrc: insauranceImage, imgAlt: 'Insurance', text: 'Insurance' },
    { href: 'https://www.wealthsimple.com/en-ca/learn/emergency-funds', imgSrc: emergencyFundImage, imgAlt: 'Emergency Fund', text: 'Emergency Fund' },
  ];

  return (
    <div className="education">
      <Navbar />
      <h1>Education</h1>
      <p className="education-intro">Click on any of these resources to help you learn more about personal finance:</p>
      <div className="education-links">
        {educationItems.map((item, index) => (
          <EducationItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Education;