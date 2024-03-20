import React, { useState } from "react";
import "../index.css";

function Modal({ closeModal, updateGoalsInExpenses, totalBudget, goalFields: initialGoalFields, setNewExpenseAmount, setNewExpenseCategory, handleSaveExpense, ensureCategoryExists }) {
  const [goalFields, setGoalFields] = useState(initialGoalFields || [{ id: 1, goal: "", percentage: 0 }]);
  const [inputTotalBudget, setInputTotalBudget] = useState(totalBudget || 0); // Initialize with 0 if totalBudget is not provided

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


  const deleteExpenseAndCategory = async (category) => {
    try {
      const expenseId = expenseIDs[Object.keys(expenses).indexOf(category)];
      const response = await fetch(
        `http://localhost:8080/api/expenses/remove/${expenseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove expense");
      }

      // Update frontend
      const updatedExpenses = { ...expenses };
      delete updatedExpenses[category];
      setExpenses(updatedExpenses);
      setTempExpenses(updatedExpenses);

      // Check if category needs to be deleted
      const categoryUsed = await checkCategoryUsage(expenseId);
      if (!categoryUsed) {
        deleteCategory(expenseId);
      }
    } catch (error) {
      console.error("Error removing expense:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    //API call
    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/remove/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove category");
      }
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  const handleTotalBudgetChange = (e) => {
    const newTotalBudget = parseFloat(e.target.value); // Parse input value as a float. this was horrible to code.
    setInputTotalBudget(newTotalBudget);
  };

  const removeGoal = (id) => {
    const updatedFields = goalFields.filter((field) => field.id !== id);
    setGoalFields(updatedFields);
  };

  const saveGoals = async () => {
    for (const { goal, percentage } of goalFields) {
      if (goal.trim() === "" || percentage <= 0) {
        alert("Please ensure all goals have a name and a positive percentage.");
        return;
      }

      const categoryId = await ensureCategoryExists(goal); // Resolve category name to ID
      const amount = (inputTotalBudget * parseFloat(percentage)) / 100;

      await handleSaveExpense({ categoryId, amount });
    }

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
              -
            </button>
          </div>
        ))}

        <button onClick={addMoreFields}>Add</button>

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
