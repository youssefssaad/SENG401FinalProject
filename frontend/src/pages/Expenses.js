import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";
import questionIcon from "../assets/question_icon.png";
import Instruction from "../components/Instruction";
import Navbar from "../components/Navbar";

function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [goalFields, setGoalFields] = useState([]);
  const [expenses, setExpenses] = useState({});
  const [totalBudget, setTotalBudget] = useState(0);
  const [tempExpenses, setTempExpenses] = useState({});
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [expenseIDs, setExpenseIDs] = useState([]);

  //added this..
  const ensureCategoryExists = async (categoryName) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!categoryName) {
      console.error("Category name is undefined or empty");
      throw new Error("Category name is required");
    }

    const categoriesResponse = await fetch(
      "http://localhost:8080/api/categories",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (!categoriesResponse.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await categoriesResponse.json();
    let existingCategory = categories.find(
      (category) =>
        category.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (!existingCategory) {
      const newCategoryResponse = await fetch(
        "http://localhost:8080/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!newCategoryResponse.ok) {
        throw new Error("Failed to create new category");
      }

      existingCategory = await newCategoryResponse.json();
    }
    return existingCategory.id;
  };

  const handleSaveTotalBudget = async (budget) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      console.log("What is the jwtToken here? " + jwtToken);

      if (isNaN(budget)) {
        console.error("Invalid budget amount:", budget);
        return;
      }

      // API call to save the expense
      const response = await fetch(`http://localhost:8080/api/budget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(budget),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleSaveExpense = async (expenseData) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      console.log("What is the jwtToken here? " + jwtToken);
      const categoryId = expenseData.categoryId;
      const amount = parseFloat(expenseData.amount);

      console.log("What is the categoryId here" + categoryId);
      console.log("What is the amount here?" + amount);

      if (isNaN(amount)) {
        console.error("Invalid expense amount:", expenseData.amount);
        return;
      }

      const finalExpenseData = {
        amount: amount,
      };

      console.log("Sending expense data:", finalExpenseData);

      // API call to save the expense
      const response = await fetch(
        `http://localhost:8080/api/expenses/add/${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(finalExpenseData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    }
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

  const updateExpensesFromGoals = () => {
    const newExpenses = {};
    goalFields.forEach(({ goal, percentage }) => {
      const amount = (totalBudget * parseFloat(percentage)) / 100;
      newExpenses[goal] = amount;
    });
    setExpenses(newExpenses);
    setTempExpenses(newExpenses); // Initialize tempExpenses with expenses
  };

  const getGoalsFromLocalStorage = () => {
    const savedGoals = JSON.parse(localStorage.getItem("goalFields")) || [];
    setGoalFields(savedGoals);
  };

  const updateGoalsInExpenses = (updatedGoals, updatedTotalBudget) => {
    setGoalFields(updatedGoals);
    setTotalBudget(updatedTotalBudget);
    updateExpensesFromGoals();
  };

  const handleIncrease = async (id) => {
    if (!expenseIDs.includes(id)) {
      console.error("Invalid expense ID:", id);
      return;
    }
  
    const newAmount = tempExpenses[id] + 1;
  
    // Update tempExpenses in state
    setTempExpenses((prevState) => ({ ...prevState, [id]: newAmount }));
  

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await updateExpense(id, newAmount, jwtToken);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  
  const handleDecrease = async (id) => {
    if (!expenseIDs.includes(id) || tempExpenses[id] <= 0) {
      return;
    }
  
    const newAmount = tempExpenses[id] - 1;
  
    // Update tempExpenses in state
    setTempExpenses((prevState) => ({ ...prevState, [id]: newAmount }));
  
    // send update to backend
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await updateExpense(id, newAmount, jwtToken);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  
 

  const checkCategoryUsage = async (categoryId) => {
    const response = await fetch(
      `http://localhost:8080/api/expenses/category/${categoryId}/usage`
    );
    if (!response.ok) {
      throw new Error("Failed to check category usage");
    }
    const isUsed = await response.json();
    return isUsed;
  };

  const fetchExpenseIDs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses");
      if (response.ok) {
        const data = await response.json();
        const ids = data.map((expense) => expense.id);
        setExpenseIDs(ids);
      } else {
        throw new Error("Failed to fetch expense IDs");
      }
    } catch (error) {
      console.error("Error fetching expense IDs:", error);
    }
  };

  // const updateExpense = async (category, newAmount) => {
  //   try {
  //     const expenseId = expenseIDs[Object.keys(expenses).indexOf(category)];
  //     const response = await fetch(
  //       `http://localhost:8080/api/expenses/update/${expenseId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ amount: newAmount }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update expense");
  //     }

  //     // Update frontend state after successful backend update
  //     const updatedExpenses = { ...expenses };
  //     updatedExpenses[category] = newAmount;
  //     setExpenses(updatedExpenses);
  //     setTempExpenses(updatedExpenses);
  //   } catch (error) {
  //     console.error("Error updating expense:", error);
  //   }
  // };

  const updateExpense = async (id, newAmount, jwtToken) => {
    const response = await fetch(`http://localhost:8080/api/expenses/update/${id}`, {
      method: 'PUT', // or PATCH if your backend supports it
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify({ amount: newAmount }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update expense');
    }
  
    // Optionally refresh or update local state based on response
    const updatedExpense = await response.json();
    console.log('Updated expense:', updatedExpense);
  };
  
//assumptions ive made
//expenseIDs state is accurately populated with the IDs of the expenses
//tempExpenses uses expense IDs as keys. 

  useEffect(() => {
    getGoalsFromLocalStorage();
  }, []);

  useEffect(() => {
    updateExpensesFromGoals();
  }, [goalFields, totalBudget]);

  useEffect(() => {
    fetchExpenseIDs();
  }, [totalBudget, expenses]);

  //This useEffect is fetching all the expenses based on the user by calling the proper endpoint.
  useEffect(() => {
    console.log("Fetching user expenses");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.token) {
      const jwtToken = storedUser.token;
      console.log("JWT Token found for testing: ", jwtToken);
      const userID = storedUser.id;

      console.log("What is the userID here?" + userID);

      fetch(`http://localhost:8080/api/expenses/user/${userID}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user expenses.");
          }
        })
        .then((expensesData) => {
          const fetchedExpenses = {};
          expensesData.forEach((expense) => {
            fetchedExpenses[expense.category.name] = expense.amount;
          });
          setExpenses(fetchedExpenses);
          setTempExpenses(fetchedExpenses);
        })
        .catch((error) => {
          console.error("Error fetching user expenses:", error);
        });
    } else {
      console.log("No user token found in localStorage");
    }
  }, []);

  return (
    <div className="expenses-container">
      <Navbar />
      <div>
        <h1>Expenses</h1>
      </div>
      <div className="actions-container">
        <button className="addButton" onClick={openModal}>
          Add expense
        </button>
        <div className="instructions-modal" onClick={openInstruction}>
          <img
            src={questionIcon}
            alt="Question Icon"
            className="question-icon"
          />
        </div>
      </div>
      {showModal && (
        <Modal
          closeModal={closeModal}
          updateGoalsInExpenses={updateGoalsInExpenses}
          totalBudget={totalBudget}
          goalFields={goalFields}
          ensureCategoryExists={ensureCategoryExists}
          setNewExpenseAmount={setNewExpenseAmount}
          setNewExpenseCategory={setNewExpenseCategory}
          handleSaveExpense={handleSaveExpense}
          handleSaveTotalBudget={handleSaveTotalBudget}
          setExpenses={setExpenses}
          expenses={expenses}
          expenseIDs={expenseIDs}
          setExpenseIDs={setExpenseIDs}
          checkCategoryUsage={checkCategoryUsage}
        />
      )}
      {showInstruction && <Instruction closeInstruction={closeInstruction} />}
      <hr />
      <div>
        <ul>
          {Object.entries(expenses).map(([category, amount]) => (
            <li className="expenses-item-list" key={category}>
              {category}
              <button onClick={() => handleIncrease(category)}>+</button>
              <span
                className="expenses-monetary-amount"
                style={{
                  color: tempExpenses[category] > amount ? "red" : "green",
                }}
              >
                ${tempExpenses[category]?.toFixed(2)}
              </span>
              <button onClick={() => handleDecrease(category)}>-</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Expenses;
