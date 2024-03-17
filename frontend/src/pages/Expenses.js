import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";
import questionIcon from "../assets/question_icon.png";
import Instruction from "../components/Instruction";
import Navbar from "../components/Navbar";

function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [goalFields, setGoalFields] = useState([]);
  const [expenses, setExpenses] = useState({});
  const [totalBudget, setTotalBudget] = useState(0);
  const [tempExpenses, setTempExpenses] = useState({});
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');

  const ensureCategoryExists = async (categoryName) => {
    const categoriesResponse = await fetch('http://localhost:8080/api/categories');
    const categories = await categoriesResponse.json();

    let existingCategory = categories.find(category => category.name === categoryName);

    if (!existingCategory) {
      const newCategoryResponse = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!newCategoryResponse.ok) {
        throw new Error('Failed to create new category');
      }

      existingCategory = await newCategoryResponse.json();
    }

    return existingCategory.id;
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openInstruction = () => {
    setShowInstruction(true);
  };

  const closeInstruction = () => {
    setShowInstruction(false);
  };

  const updateExpensesFromGoals = () => {
    const newExpenses = {};
    goalFields.forEach(({ goal, percentage }) => {
      const amount = (totalBudget * parseFloat(percentage)) / 100;
      newExpenses[goal] = amount;
    });
    setExpenses(newExpenses);
    setTempExpenses(newExpenses); // Initialize tempExpenses with expenses
  };

  const getGoalsFromLocalStorage = () => {
    const savedGoals = JSON.parse(localStorage.getItem("goalFields")) || [];
    setGoalFields(savedGoals);
  };

  const updateGoalsInExpenses = (updatedGoals, updatedTotalBudget) => {
    setGoalFields(updatedGoals);
    setTotalBudget(updatedTotalBudget); 
    updateExpensesFromGoals();
  };

  const handleIncrease = (category) => {
    const newTempExpenses = { ...tempExpenses };
    newTempExpenses[category] += 1;
    setTempExpenses(newTempExpenses);

    // Check if total temporary expenses exceed total budget, and if so, alert the user
    const tempTotal = Object.values(newTempExpenses).reduce(
      (acc, curr) => acc + curr,
      0
    );
    if (tempTotal > totalBudget) {
      alert("Your spending has surpassed the budgeted amount for this month.");
    }
  };

  const handleDecrease = (category) => {
    const newTempExpenses = { ...tempExpenses };
    if (newTempExpenses[category] > 0) {
      newTempExpenses[category] -= 1;
      setTempExpenses(newTempExpenses);
    }
  };

  const handleSaveExpense = async (expenseData) => {
    try {

      const categoryId = await ensureCategoryExists(expenseData.category);
      const amount = parseFloat(expenseData.amount);

      if (isNaN(amount)) {
        console.error("Invalid expense amount:", expenseData.amount);
        return;
      }

      const finalExpenseData = {
        amount: amount,
        category: { id: categoryId },
      };

      console.log("Sending expense data:", finalExpenseData);

      // API call to save the expense
      const response = await fetch(`http://localhost:8080/api/expenses/add/${categoryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalExpenseData),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const checkCategoryUsage = async (categoryId) => {
    // Fetch all expenses to check if any other expense is using the category
    const expensesResponse = await fetch('http://localhost:8080/api/expenses');
    const expenses = await expensesResponse.json();

    // Check if the category is used by any other expenses
    return expenses.some(expense => expense.category && expense.category.$id === categoryId);
  };

  useEffect(() => {
    getGoalsFromLocalStorage();
  }, []);

  useEffect(() => {
    updateExpensesFromGoals();
  }, [goalFields, totalBudget]);

  return (
    <div>
    <Navbar />
      <div>
        <h1>Expenses</h1>
      </div>

      <div className="container">
        <div className="addButton addButton--active" onClick={openModal}></div>
        <div className="instructions-modal" onClick={openInstruction}>
          <img
            src={questionIcon}
            alt="Question Icon"
            className="question-icon"
          />
        </div>{" "}
        {showModal && (
            <Modal
                closeModal={closeModal}
                updateGoalsInExpenses={updateGoalsInExpenses}
                totalBudget={totalBudget}
                goalFields={goalFields}
                ensureCategoryExists={ensureCategoryExists}
                handleSaveExpense={handleSaveExpense}
            />
        )}
        {showInstruction && <Instruction closeInstruction={closeInstruction} />}
        <hr />
        <div>
          <ul>
            {Object.entries(expenses).map(([category, amount]) => (
              <li className="expenses-item-list" key={category}>
                {category}
                <button onClick={() => handleIncrease(category)}>+</button>
                <span
                  className="expenses-monetary-amount"
                  style={{
                    color: tempExpenses[category] > amount ? "red" : "green",
                  }}
                >
                  ${tempExpenses[category].toFixed(2)}
                </span>
                <button onClick={() => handleDecrease(category)}>-</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;