import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";

function Expenses() {
  const [totalBudget, setTotalBudget] = useState(1000); // Set an initial total budget value
  const [expenses, setExpenses] = useState({
    rent: 500,
    food: 200,
    play: 100,
    savings: 50,
    investment: 150,
  });

  const handleBudgetChange = (amount) => {
    setTotalBudget((prevBudget) => prevBudget + amount);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleExpenseChange = (category, amount) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: prevExpenses[category] + amount,
    }));
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <div>
      <div>
        <h1>Expenses</h1>
      </div>

      <div style={{ alignContent: "center" }}>
        <div className="addButton addButton--active" onClick={openModal}></div>

        {showModal && <Modal closeModal={closeModal} />}

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
