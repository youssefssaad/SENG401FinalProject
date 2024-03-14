import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";
import questionIcon from "../assets/question_icon.png";
import Instruction from "../components/Instruction";

function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [goalFields, setGoalFields] = useState([]);
  const [expenses, setExpenses] = useState({});
  const [totalBudget, setTotalBudget] = useState(0);

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
  };

  const getGoalsFromLocalStorage = () => {
    const savedGoals = JSON.parse(localStorage.getItem("goalFields")) || [];
    setGoalFields(savedGoals);
  };

  const updateGoalsInExpenses = (updatedGoals, updatedTotalBudget) => {
    setGoalFields(updatedGoals);
    setTotalBudget(updatedTotalBudget); // Update totalBudget
    updateExpensesFromGoals();
  };

  useEffect(() => {
    getGoalsFromLocalStorage();
  }, []);

  useEffect(() => {
    updateExpensesFromGoals();
  }, [goalFields, totalBudget]);

  return (
    <div>
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
            goalFields={goalFields} // Pass the goalFields data
          />
        )}
        {showInstruction && <Instruction closeInstruction={closeInstruction} />}
        <hr />
        <div>
          <ul>
            {Object.entries(expenses).map(([category, amount]) => (
              <li className="expenses-item-list" key={category}>
                {category}
                <span
                  className="expenses-monetary-amount"
                  style={{ color: amount > totalBudget ? "red" : "green" }}
                >
                  ${amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;


// features to add
// ________________________
//everything still needs to be properly styled so it doesn't look awful
//the budget when loaded per goal represents the quantity of goal money they should spend. ->
//the decrease button should deduct 5 from their money and update that value not append
// when the budget goes down below the goal, the goal should be highlighted in red, if it is above the goal, it should be highlighted in green
//if the total budget is less than the total of all the goals, the user should be alerted that they are spending more than they have
//if the total budget changes and there are goals that are set and displayed, the goals should be updated to reflect the new budget

//when a goal is deleted, all of its expenses are also deleted. DONE
// [x] Make sure the budget is always positive DONE
