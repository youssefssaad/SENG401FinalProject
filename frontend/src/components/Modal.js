import React, { useState } from "react";
import "../index.css";

function Modal({ closeModal, updateGoalsInExpenses, expenses, updateExpensesFromGoals }) {
  const [goalFields, setGoalFields] = useState([
    { id: 1, goal: "", quantity: 1 },
  ]);

  const addMoreFields = () => {
    const newField = {
      id: goalFields.length + 1,
      goal: "",
      quantity: 1,
    };
    setGoalFields([...goalFields, newField]);
  };

  const handleInputChange = (id, key, value) => {
    const updatedFields = goalFields.map((field) =>
      field.id === id ? { ...field, [key]: value } : field
    );
    setGoalFields(updatedFields);
  };

  const handleQuantityChange = (id, change) => {
    const updatedFields = goalFields.map((field) => {
      const newQuantity = field.quantity + change;
      return {
        ...field,
        quantity:
          newQuantity >= 0 ? (newQuantity <= 100 ? newQuantity : 100) : 0,
      };
    });
    setGoalFields(updatedFields);
  };

  const removeGoal = (id) => {
    const removedGoal = goalFields.find((field) => field.id === id);
    const updatedFields = goalFields.filter((field) => field.id !== id);

    // Remove associated expenses
    const newExpenses = { ...expenses };
    delete newExpenses[removedGoal.goal];

    setGoalFields(updatedFields);
    updateExpensesFromGoals();
  };

  const saveToLocalStorage = () => {
    const totalQuantity = goalFields.reduce(
      (sum, field) => sum + Number(field.quantity),
      0
    );

    if (
      totalQuantity > 100 ||
      totalQuantity === 0 ||
      totalQuantity === 100 * goalFields.length
    ) {
      alert(
        "Total percentage cannot exceed 100%, be 0%, or be 100% for each goal"
      );
      return;
    }

    localStorage.setItem("goalFields", JSON.stringify(goalFields));
    updateGoalsInExpenses(goalFields);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h3 className="modal-title">Set Your Goals</h3>

        {goalFields.map(({ id, goal, quantity }) => (
          <div key={id} className="modal-input-group">
            <input
              className="modal-input"
              type="text"
              placeholder={`Category ${id}`}
              value={goal}
              onChange={(e) => handleInputChange(id, "goal", e.target.value)}
            />
            <div className="quantity-group">
              <input
                className="quantity-input"
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleInputChange(id, "quantity", e.target.value)
                }
              />
            </div>

            <button className="remove-goal" onClick={() => removeGoal(id)}>
              {" "}
              -{" "}
            </button>
          </div>
        ))}

        <button onClick={addMoreFields}>Add</button>

        <div className="save-changes-cube">
          <button className="save-changes" onClick={saveToLocalStorage}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

//features to add
//_______________
//the sum of all the goals' quantities should not exceed 100 (otherwise bring up an ALERT when trying to save)
// cap the value at 0 to not go negative DONE
//add a button to remove each goal DONE
//the last goal should have the add more button DONE
// max height of the modal should be set and scrollable DONE
//close model buton should be replaced by a 'X' in the top right corner DONE
//add a button to save the goals that is bigger and more noticeable. will PUT to the database SAVE DONE
//no one goal should have a quantity of 0  or 100 (otherwise bring up an ALERT when trying to save) DONE
