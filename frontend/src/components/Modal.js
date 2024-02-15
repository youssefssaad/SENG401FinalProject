import React, { useState } from "react";
import "../index.css";

function Modal({ closeModal }) {
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
        quantity: newQuantity >= 0 ? newQuantity : 0,
      };
    });
    setGoalFields(updatedFields);
  };

  const removeGoal = (id) => {
    const updatedFields = goalFields.filter((field) => field.id !== id);
    setGoalFields(updatedFields);
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
          <button className="save-changes">SAVE</button>
          {/* !!logic to push to the database here still has to be implemented!! */}
        </div>
      </div>
    </div>
  );
}

export default Modal;

//features to add
//_______________
// cap the value at 0 to not go negative DONE
//add a button to remove each goal DONE
//the last goal should have the add more button DONE
// max height of the modal should be set and scrollable DONE
//close model buton should be replaced by a 'X' in the top right corner DONE
//add a button to save the goals that is bigger and more noticeable. will PUT to the database SAVE DONE
