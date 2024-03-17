import React, { useState, useEffect } from "react";
import "../index.css";

function Modal({ closeModal, updateGoalsInExpenses, totalBudget, goalFields: initialGoalFields, ensureCategoryExists, handleSaveExpense }) {
  const [goalFields, setGoalFields] = useState(initialGoalFields || [{ id: 1, goal: "", percentage: 0 }]);
  const [inputTotalBudget, setInputTotalBudget] = useState(totalBudget || 0);

  useEffect(() => {
    setInputTotalBudget(totalBudget);
  }, [totalBudget]);

  const handleInputChange = (index, key, value) => {
    const updatedFields = goalFields.map((field, idx) =>
        idx === index ? { ...field, [key]: value } : field
    );
    setGoalFields(updatedFields);
  };

  const addMoreFields = () => {
    setGoalFields([...goalFields, { id: goalFields.length + 1, goal: "", percentage: 0 }]);
  };

  const removeGoal = (index) => {
    setGoalFields(goalFields.filter((_, idx) => idx !== index));
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
          <button className="close-button" onClick={closeModal}>X</button>
          <h3 className="modal-title">Set Your Goals</h3>
          <label className="budget-input">Total Budget:</label>
          <input
              className="modal-input"
              type="number"
              value={inputTotalBudget}
              onChange={(e) => setInputTotalBudget(parseFloat(e.target.value) || 0)}
          />
          {goalFields.map(({ id, goal, percentage }, index) => (
              <div key={id} className="modal-input-group">
                <input
                    className="modal-input"
                    type="text"
                    placeholder={`Category ${index + 1}`}
                    value={goal}
                    onChange={(e) => handleInputChange(index, "goal", e.target.value)}
                />
                <input
                    className="modal-input"
                    type="number"
                    placeholder="%"
                    value={percentage}
                    onChange={(e) => handleInputChange(index, "percentage", parseFloat(e.target.value) || 0)}
                />
                <button className="remove-goal" onClick={() => removeGoal(index)}>-</button>
              </div>
          ))}
          <button onClick={addMoreFields}>Add</button>
          <div className="save-changes-cube">
            <button className="save-changes" onClick={saveGoals}>SAVE</button>
          </div>
        </div>
      </div>
  );
}

export default Modal;
