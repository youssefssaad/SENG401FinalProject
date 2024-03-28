import React, { useEffect, useState } from "react";
import "../index.css";
import { REACT_APP_API_BASE_URL, APP_BASE_URL } from '../config';

function Modal({
  closeModal,
  updateGoalsInExpenses,
  totalBudget,
  goalFields: initialGoalFields,
  handleSaveExpense,
  handleSaveTotalBudget,
  ensureCategoryExists,
  checkCategoryUsage,
  expenseIDs,
  expenses,
}) {
  const [goalFields, setGoalFields] = useState(
    initialGoalFields || [{ id: 1, goal: "", percentage: 0 }]
  );
  const [inputTotalBudget, setInputTotalBudget] = useState(totalBudget || 0); // Initialize with 0 if totalBudget is not provided
  const [initialGoals, setInitialGoals] = useState(goalFields);

  console.log("what is the expensesIDs in the beginning here? " + expenseIDs);

  useEffect(() => {
    setInitialGoals(goalFields);
  }, []);

  const addMoreFields = () => {
    const newField = {
      id: goalFields.length + 1,
      goal: "",
      percentage: 0,
    };
    setGoalFields([...goalFields, newField]);
  };

  const handleInputChange = (id, key, value) => {
    const updatedFields = goalFields.map((field) =>
      field.id === id ? { ...field, [key]: value } : field
    );
    setGoalFields(updatedFields);
  };

  const handleTotalBudgetChange = (e) => {
    const newTotalBudget = parseFloat(e.target.value);
    setInputTotalBudget(newTotalBudget);
  };

  const removeGoal = async (id) => {
    if (!expenseIDs.length) {
      console.error("Expense IDs are not yet available");
      return;
    }

    const goalToRemove = goalFields.find((goal) => goal.id === id);
    if (!goalToRemove) {
      console.error("Goal not found");
      return;
    }

    if (goalToRemove.goal.trim() === "" && goalToRemove.percentage === 0) {
      const updatedGoalFields = goalFields.filter(
        (goalField) => goalField.id !== id
      );
      setGoalFields(updatedGoalFields);
      return;
    }

    const jwtToken = localStorage.getItem("jwtToken");

    if (!expenseIDs.length) {
      console.error("Expense IDs are not yet available");
      return;
    }

    try {
      const goal = goalFields.find((goal) => goal.id === id);
      if (!goal) {
        console.error("Goal not found");
        return;
      }

      console.log("Current expenses:", Object.keys(expenses));

      const categoryKey = Object.keys(expenses).find(
        (key) => key === goal.goal
      );
      console.log("Matching category key:", categoryKey);
      if (!categoryKey) {
        console.log(`Category '${goal.goal}' not found in expenses`);
        return;
      }

      //Will find the expenseID using the goal's cateogry name here
      const expenseIndex = Object.keys(expenses).indexOf(goal.goal);
      if (expenseIndex === -1) {
        console.error("Expense index not found for category:", goal.goal);
        return;
      }

      const expenseId = expenseIDs[expenseIndex];

      // call the delete the expense endpoint
      const expenseResponse = await fetch(
        `${REACT_APP_API_BASE_URL}/api/expenses/remove/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!expenseResponse.ok) {
        throw new Error("Failed to remove expense");
      }

      // Check if the category is used by any other expense
      const categoryUsed = await checkCategoryUsage(goal.goal);

      if (!categoryUsed) {
        //check to see if the category is not used by other expenses, then deletes the category
        //added this extra method in the backend
        // Assuming the goal.goal is the name here.
        const categoryResponse = await fetch(
          `${REACT_APP_API_BASE_URL}/api/categories/removeByName/${goal.goal}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to remove category");
        }
      }

      const updatedGoalFields = goalFields.filter(
        (goalField) => goalField.id !== id
      );
      setGoalFields(updatedGoalFields);
    } catch (error) {
      console.error("Error removing goal:", error);
    }
  };

  const saveGoals = async () => {
    const totalPercentage = goalFields.reduce(
      (sum, goalField) => sum + parseFloat(goalField.percentage),
      0
    );

    // If the total percentage exceeds 100 in our expenses, display an error message and do not save the expense
    if (totalPercentage > 100) {
      alert("The sum of the percentages for all expenses cannot exceed 100.");
      return;
    }

    for (const { id, goal, percentage } of goalFields) {
      if (goal.trim() === "" || percentage <= 0) {
        alert("Please ensure all goals have a name and a positive percentage.");
        return;
      }

      const oldCategoryName = initialGoals.find(
        (initialGoal) => initialGoal.id === id
      )?.goal;
      const categoryId = await ensureCategoryExists(goal, oldCategoryName); // Resolve category name to ID
      const amount = (inputTotalBudget * parseFloat(percentage)) / 100;

      // Check if an expense with the same category already exists
      const existingExpenseIndex = initialGoals.findIndex(
        (initialGoal) => initialGoal.id === id
      );
      if (existingExpenseIndex !== -1) {
        // If it does, update the existing expense
        const expenseId = expenseIDs[existingExpenseIndex];
        await handleSaveExpense({ categoryId, amount, expenseId });
      } else {
        // If it doesn't, create a new expense
        await handleSaveExpense({ categoryId, amount });
      }
    }

    //save total budget
    await handleSaveTotalBudget(inputTotalBudget);

    updateGoalsInExpenses(goalFields, inputTotalBudget);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h3 className="modal-title">Set Your Goals</h3>

        <label className="budget-input">Total Budget:</label>
        <input
          className="modal-input"
          type="number"
          value={inputTotalBudget}
          onChange={handleTotalBudgetChange}
        />
        {goalFields.map(({ id, goal, percentage }) => (
          <div key={id} className="modal-input-group">
            <input
              className="modal-input"
              type="text"
              placeholder={`Category ${id}`}
              value={goal}
              onChange={(e) => handleInputChange(id, "goal", e.target.value)}
            />
            <input
              className="modal-input"
              type="number"
              placeholder="%"
              value={percentage}
              onChange={(e) =>
                handleInputChange(id, "percentage", e.target.value)
              }
            />
            <button className="remove-goal" onClick={() => removeGoal(id)}>
              X
            </button>
          </div>
        ))}

        <button className="add-expenses" onClick={addMoreFields}>
          Add
        </button>

        <div className="save-changes-cube">
          <button className="save-changes" onClick={saveGoals}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
