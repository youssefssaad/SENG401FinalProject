import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";
import questionIcon from "../assets/question_icon.png";
import Instruction from "../components/Instruction";

function Expenses() {
  const [totalBudget, setTotalBudget] = useState(1000);
  const [expenses, setExpenses] = useState({
    rent: 500,
    food: 200,
    play: 100,
    savings: 50,
    investment: 150,
  });

  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const handleBudgetChange = (amount) => {
    setTotalBudget((prevBudget) => prevBudget + amount);
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

  const handleExpenseChange = (category, amount) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: prevExpenses[category] + amount,
    }));
  };

  useEffect(() => {
    if (showModal || showInstruction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal, showInstruction]);

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
        {showModal && <Modal closeModal={closeModal} />}
        {showInstruction && <Instruction closeInstruction={closeInstruction} />}
        {/* Close .instructions-modal div here */}
        <div>Total Budget: ${totalBudget}</div>
        <button onClick={() => handleBudgetChange(-50)}>Decrease Budget</button>
        <button onClick={() => handleBudgetChange(50)}>Increase Budget</button>
        <hr />
        <div>
          <ul>
            {Object.entries(expenses).map(([category, amount]) => (
              <li key={category}>
                {category}:
                <span style={{ color: amount > totalBudget ? "red" : "green" }}>
                  ${amount}
                </span>
                <button onClick={() => handleExpenseChange(category, -10)}>
                  Decrease
                </button>
                <button onClick={() => handleExpenseChange(category, 10)}>
                  Increase
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;

//connect the goals that are set to the individual displayed expenses
//question modal with information on how this page works
