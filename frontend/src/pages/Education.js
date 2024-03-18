import React from 'react';
import Navbar from '../components/Navbar';
import budgetImage from '../assets/BudgetImage.jpg';
import savingImage from '../assets/SavingImage.jpg';
import debtManageImage from '../assets/DebtManagementImage.png';
import insauranceImage from '../assets/InsauranceImage.jpeg';
import investmentImage from '../assets/InvestmentImage.jpg';
import retirementImage from '../assets/RetirementImage.jpg';
import taxImage from '../assets/TaxImage.jpeg';

function Education() {
  return (
    <div className="education">
      <Navbar />
      <h1>Education</h1>
      <p className="education-intro">Click on any of these resources to help you learn more about personal finance:</p>
      <div className="education-links">
        <div className="education-item">
          <a href="https://www.nerdwallet.com/ca/personal-finance/how-to-budget" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={budgetImage} alt="Budgeting" />
            <p>Budgeting</p>
          </a>
        </div>
        <div className="education-item">
          <a href="https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/ways-to-save-money" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={savingImage} alt="Saving" />
            <p>Saving</p>
          </a>
        </div>
        <div className="education-item">
          <a href="https://fortune.com/recommends/investing/how-to-start-investing/" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={investmentImage} alt="Investing" />
            <p>Investing</p>
          </a>
        </div>
        <div className="education-item">
          <a href="https://www.canada.ca/en/financial-consumer-agency/services/debt/plan-debt-free.html" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={debtManageImage} alt="Debt Management" />
            <p>Debt Management</p>
          </a>
        </div>
        <div className="education-item">
          <a href="https://www.investopedia.com/terms/r/retirement-planning.asp" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={retirementImage} alt="Retirement Planning" />
            <p>Retirement Planning</p>
          </a>
        </div>
        <div className="education-item">
          <a href="https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/understanding-taxes-benefits.html" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={taxImage} alt="Taxes" />
            <p>Taxes</p>
          </a>
        </div>
        <div className="education-item">
          <a href="https://www.ibc.ca/insurance-basics/how-insurance-works" target="_blank" rel="noopener noreferrer">
            <img className="education-image" src={insauranceImage} alt="Insurance" />
            <p>Insurance</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Education;