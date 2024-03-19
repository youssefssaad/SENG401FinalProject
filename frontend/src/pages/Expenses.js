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
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");

  //added this..
  const ensureCategoryExists = async (categoryName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${categoryName}`
      );
      const data = await response.json();

      if (response.ok) {
        return data.id;
      }

      if (response.status === 404) {
        const newCategoryResponse = await fetch(
          "http://localhost:8080/api/categories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: categoryName }),
          }
        );
        const newCategoryData = await newCategoryResponse.json();

        if (newCategoryResponse.ok) {
          return newCategoryData.id;
        }
      }
    } catch (error) {
      console.error("Error ensuring category exists:", error);
    }
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
      const response = await fetch(
        `http://localhost:8080/api/expenses/add/${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      setNewExpenseAmount("");
      setNewExpenseCategory("");
    } catch (error) {
      console.error("Error saving expense:", error);
    }
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
            ensureCategoryExists={ensureCategoryExists} // Pass ensureCategoryExists to Modal
            setNewExpenseAmount={setNewExpenseAmount}
            setNewExpenseCategory={setNewExpenseCategory}
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
