import React, {useState} from 'react';
import Navbar from '../components/Navbar';

function BudgetPage() {
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [expenses, setExpenses] = useState({
        fixed: {},
        variable: {}
    });
    const expenseCategories = [
        'Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 
        'Healthcare', 'Savings and Investments', 'Debt Repayment', 
        'Entertainment', 'Personal Spending', 'Miscellaneous'
    ];

    const handleIncomeChange = (e) => {
        setMonthlyIncome(e.target.value);
    };

    const handleExpenseChange = (category, type, value) => {
        setExpenses(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [category]: value
            }
        }));
    };

    const renderExpenseInputs = (type) => {
        return expenseCategories.map((category) => (
            <div key={category}>
                <label>{category}</label>
                <input
                    type="number"
                    value={expenses[type][category] || ''}
                    onChange={(e) => handleExpenseChange(category, type, e.target.value)}
                    placeholder={`Enter ${type} expense`}
                />
            </div>
        ));
    };

    // Placeholder function for submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Income:", monthlyIncome);
        console.log("Submitted Expenses:", expenses);
        // Here you would typically send this data to your backend or state management
    };

    return (
        <div className="budget-page">
            <Navbar />
            <h1>Budget Planner</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Monthly Income:</label>
                    <input
                        type="number"
                        value={monthlyIncome}
                        onChange={handleIncomeChange}
                        placeholder="Enter your total monthly income"
                    />
                </div>
                <h2>Fixed Expenses</h2>
                {renderExpenseInputs('fixed')}
                <h2>Variable Expenses</h2>
                {renderExpenseInputs('variable')}
                <button type="submit">Submit Budget</button>
            </form>
        </div>
    );
}

export default BudgetPage;

