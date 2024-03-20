// Budget.js
import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart'; // Make sure to install this package
import { saveAs } from 'file-saver'; // Make sure to install file-saver for CSV export

function Budget() {
  // Placeholder data - replace with actual data fetching logic
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3000);
  const [categories, setCategories] = useState([
    { title: 'Rent', value: 1000, color: '#E38627' },
    { title: 'Groceries', value: 500, color: '#C13C37' },
    { title: 'Utilities', value: 300, color: '#6A2135' },
    // Add more categories as needed
  ]);

  const savings = income - expenses;
  const savingsPercentage = (savings / income) * 100;

  // Generate CSV content from expenses data
  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Amount\n";
    categories.forEach(category => {
      csvContent += `${category.title},${category.value}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "transaction_history.csv");
  };

  // Placeholder for email sharing functionality
  const shareBudgetSummary = () => {
    alert("Share budget summary functionality to be implemented.");
  };

  return (
    <div>
      <h1>Budget Overview</h1>
      <p>Total Monthly Income: ${income}</p>
      <p>Total Monthly Expenses: ${expenses}</p>
      <p>Savings for the Month: ${savings}</p>
      <p>Percentage of Income Saved: {savingsPercentage.toFixed(2)}%</p>

      <h2>Analytics</h2>
      <div>
        <h3>Budget Variance</h3>
        <p>Categories Spent On: {categories.length}</p>
        <h3>Income Analysis</h3>
        <PieChart data={categories} />
      </div>

      <h2>Exporting</h2>
      <button onClick={generateCSV}>Export Transaction History as CSV</button>
      <button onClick={shareBudgetSummary}>Share Budget Summary via Email</button>
    </div>
  );
}

export default Budget;
