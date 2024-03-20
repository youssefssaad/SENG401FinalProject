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
