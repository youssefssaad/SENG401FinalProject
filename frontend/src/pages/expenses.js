import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";
import questionIcon from "../assets/question_icon.png";
import Instruction from "../components/Instruction";

function Expenses() {
  const [totalBudget, setTotalBudget] = useState(1000);
  const [expenses, setExpenses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [goalFields, setGoalFields] = useState([]);
  const [delayPassed, setDelayPassed] = useState(false);
  const [goals, setGoals] = useState({}); 

  const handleBudgetChange = (amount) => {
    const newTotalBudget = totalBudget + amount;

    if (newTotalBudget < 0) {
      alert("Total Budget cannot be less than 0");
      return;
    }

    setTotalBudget(newTotalBudget);
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
    setExpenses((prevExpenses) => {
      const updatedAmount = prevExpenses[category] + amount;
  
      const initialGoalAmount = goals[category] || 0; // Use the initial goal amount from goals state
  
      const element = document.getElementById(category);
  
      if (element) {
        const colorStyle = updatedAmount < initialGoalAmount ? "red" : "green";
        element.style.color = colorStyle;
      }
  
      return {
        ...prevExpenses,
        [category]: updatedAmount,
      };
    });
  };

  const updateExpensesFromGoals = () => {
    const newExpenses = { ...expenses };
    const newGoals = [...goalFields];
  
    goalFields.forEach(({ goal, quantity }) => {
      const calculatedAmount = (quantity / 100) * totalBudget;
  
      // Delete expenses if the goal is removed
      if (quantity === 0) {
        delete newExpenses[goal];
      } else {
        // Otherwise, update or add expenses
        if (newExpenses[goal] !== undefined) {
          newExpenses[goal] += calculatedAmount;
        } else {
          newExpenses[goal] = calculatedAmount;
        }
      }
    });
  
    setExpenses(newExpenses);
  
    // Update the goals list with calculated amounts
    const updatedGoals = goalFields.map(({ goal, quantity }) => ({
      goal,
      quantity,
      calculatedAmount: (quantity / 100) * totalBudget,
    }));
  
    setGoals(updatedGoals);
  };

  const getGoalsFromLocalStorage = () => {
    const savedGoals = JSON.parse(localStorage.getItem("goalFields")) || [];
    setGoalFields(savedGoals);
  };

  const updateGoalsInExpenses = (updatedGoals) => {
    setGoalFields(updatedGoals);
    updateExpensesFromGoals();
  };



  useEffect(() => {
    // Show instruction modal when delay has passed
    if (delayPassed) {
      setShowInstruction(true);
    }
  }, [delayPassed]);

  useEffect(() => {
    if (showModal || showInstruction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal, showInstruction]);


  useEffect(() => {
    getGoalsFromLocalStorage();
  }, []);


  useEffect(() => {
    // After one second, set the delayPassed state to true
    const timeoutId = setTimeout(() => {
      setDelayPassed(true);
    }, 1000);

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount

  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // Show instruction modal when delay has passed
    if (delayPassed) {
      setShowInstruction(true);
    }
  }, [delayPassed]);

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
        {showModal && (
          <Modal
            closeModal={() => {
              closeModal();
              updateExpensesFromGoals();
            }}
            updateGoalsInExpenses={updateGoalsInExpenses}
            expenses={expenses}
            updateExpensesFromGoals={updateExpensesFromGoals} 
          />
        )}
        {showInstruction && <Instruction closeInstruction={closeInstruction} />}
        <div>Total Budget: ${totalBudget}</div>
        <button onClick={() => handleBudgetChange(-50)}>Decrease</button>
        <button onClick={() => handleBudgetChange(50)}>Increase</button>
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
                <button
                  className="d"
                  onClick={() => handleExpenseChange(category, -5)}
                >
                  -
                </button>
                <button onClick={() => handleExpenseChange(category, 5)}>
                +
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

// features to add
// ________________________
//everything still needs to be properly styled so it doesn't look awful
//the budget when loaded per goal represents the quantity of goal money they should spend. ->
//the decrease button should deduct 5 from their money and update that value not append
// when the budget goes down below the goal, the goal should be highlighted in red, if it is above the goal, it should be highlighted in green
//if the total budget is less than the total of all the goals, the user should be alerted that they are spending more than they have
//if the total budget changes and there are goals that are set and displayed, the goals should be updated to reflect the new budget

//when a goal is deleted, all of its expenses are also deleted. DONE
//goals that use the same name should overwrite the previous value written to it. DONE
// [x] Make sure the budget is always positive DONE
//connect the goals that are set to the individual displayed expenses DONE
//question modal with information on how this page works DONE
// question modal should immediately pop open when the page is loaded... fade in DONE

