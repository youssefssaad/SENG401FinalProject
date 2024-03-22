import React from 'react';
import Navbar from '../components/Navbar';
import budgetImage from '../assets/BudgetImage.jpg';
import savingImage from '../assets/SavingImage.jpg';
import debtManageImage from '../assets/DebtManagementImage.png';
import insauranceImage from '../assets/InsauranceImage.jpeg';
import investmentImage from '../assets/InvestmentImage.jpg';
import retirementImage from '../assets/RetirementImage.jpg';
import taxImage from '../assets/TaxImage.jpeg';
import EducationItem from '../components/EducationItem';

function Education() {
  return (
    <div className="education">
      <Navbar />
      <h1>Education</h1>
      <p className="education-intro">Click on any of these resources to help you learn more about personal finance:</p>
      <div className="education-links">
      <EducationItem link="https://www.nerdwallet.com/ca/personal-finance/how-to-budget" imageSrc={budgetImage} altText="Budgeting" description="Budgeting"/>
      <EducationItem link="https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/ways-to-save-money" imageSrc={savingImage} altText="Saving" description="Saving"/>
      <EducationItem link="https://fortune.com/recommends/investing/how-to-start-investing/" imageSrc={investmentImage} altText="Investing" description="Investing"/>
      <EducationItem link="https://www.canada.ca/en/financial-consumer-agency/services/debt/plan-debt-free.html" imageSrc={debtManageImage} altText="Debt Management" description="Debt Management"/>
      <EducationItem link="https://www.investopedia.com/terms/r/retirement-planning.asp" imageSrc={retirementImage} altText="Retirement Planning" description="Retirement Planning"/>
      <EducationItem link="https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/understanding-taxes-benefits.html" imageSrc={taxImage} altText="Taxes" description="Taxes"/>
      <EducationItem link="https://www.ibc.ca/insurance-basics/how-insurance-works" imageSrc={insauranceImage} altText="Insurance" description="Insurance"/>
      </div>
    </div>
  );
};

export default Education;