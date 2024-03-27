import React, { useState, useEffect } from "react";
import "../index.css";
import Modal from "../components/Modal";
import questionIcon from "../assets/question_icon.png";
import Instruction from "../components/Instruction";
import Navbar from "../components/Navbar";

function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [goalFields, setGoalFields] = useState(
    JSON.parse(localStorage.getItem("goalFields")) || []
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || {}
  );
  const [totalBudget, setTotalBudget] = useState(
    JSON.parse(localStorage.getItem("totalBudget")) || 0
  );
  const [tempExpenses, setTempExpenses] = useState(
    JSON.parse(localStorage.getItem("tempExpenses")) || {}
  );
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [expenseIDs, setExpenseIDs] = useState([]);
  const [categoryToId, setCategoryToId] = useState(
    JSON.parse(localStorage.getItem("categoryToId")) || {}
  );
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const openPurchaseModal = (category) => {
    setNewExpenseCategory(category);
    setShowPurchaseModal(true);
  };

  const ensureCategoryExists = async (
    newCategoryName,
    oldCategoryName = null
  ) => {
    const jwtToken = localStorage.getItem("jwtToken");

    // If oldCategoryName is given, then just update the existing category
    if (oldCategoryName) {
      const response = await fetch(
        `http://localhost:8080/api/categories/updateByName/${oldCategoryName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ name: newCategoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const updatedCategory = await response.json();
        return updatedCategory.id;
      }
    }

    // If oldCategoryName is not given, gotta make a new category
    const response = await fetch(`http://localhost:8080/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ name: newCategoryName }),
    });

    if (!response.ok) {
      throw new Error("Failed to create category");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const newCategory = await response.json();
      return newCategory.id;
    }
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

      if (isNaN(amount)) {
        console.error("Invalid expense amount:", expenseData.amount);
        return;
      }

      const finalExpenseData = {
        amount: amount,
      };

      let response;
      if (expenseData.expenseId) {
        // If an expense ID is provided, update the existing expense
        response = await fetch(
          `http://localhost:8080/api/expenses/update/${expenseData.expenseId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(finalExpenseData),
          }
        );
      } else {
        // If no expense ID is provided, create a new expense
        response = await fetch(
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
      }

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }
      const newExpense = await response.json();
      const newExpenseCategory =
        typeof newExpense.category === "object"
          ? newExpense.category.name
          : newExpense.category;

      setExpenses((prevState) => ({
        ...prevState,
        [newExpenseCategory]: newExpense.amount,
      }));
      setCategoryToId((prevState) => ({
        ...prevState,
        [newExpenseCategory]: newExpense.id,
      }));
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleRemoveExpense = async (category) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      // Get the expense ID for that category and yeet it from the state
      const expenseId = categoryToId[category];
      if (!expenseId) {
        console.error(`Expense ID not found for category: ${category}`);
        return;
      }

      // Delete the expense from the backend
      const response = await fetch(
        `http://localhost:8080/api/expenses/remove/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove expense");
      }

      // Check if the category is used by any other expense
      const categoryUsed = Object.keys(expenses).some(
        (key) =>
          key !== category &&
          expenses[key].category === expenses[category].category
      );

      if (!categoryUsed) {
        // If the category is not used by any other expense, delete the category
        const categoryResponse = await fetch(
          `http://localhost:8080/api/categories/removeByName/${category}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to remove category");
        }
      }

      setExpenses((prevExpenses) => {
        const newExpenses = { ...prevExpenses };
        delete newExpenses[category];
        return newExpenses;
      });

      // Remove the expense from the local storage
      localStorage.setItem("expenses", JSON.stringify(expenses));

      setGoalFields((prevGoalFields) => {
        const newGoalFields = prevGoalFields.filter(
          (goalField) => goalField.goal !== category
        );
        return newGoalFields;
      });
    } catch (error) {
      console.error(`Error removing expense for category ${category}:`, error);
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

  const handleIncrease = async (category) => {
    const id = categoryToId[category];
    const newAmount = tempExpenses[category] + 1;

    const goalField = goalFields.find(
      (goalField) => goalField.goal === category
    );
    if (goalField) {
      const goalAmount = (totalBudget * goalField.percentage) / 100;
    }

    setTempExpenses((prevState) => ({ ...prevState, [category]: newAmount }));

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await updateExpense(id, newAmount, jwtToken);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDecrease = async (category) => {
    const id = categoryToId[category];
    if (tempExpenses[category] <= 0) {
      alert("Cannot decrease expense amount further");
      return;
    }

    const newAmount = tempExpenses[category] - 1;

    // Update tempExpenses in state
    setTempExpenses((prevState) => ({ ...prevState, [category]: newAmount }));

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

  const updateExpense = async (id, newAmount, jwtToken) => {
    const response = await fetch(
      `http://localhost:8080/api/expenses/update/${id}`,
      {
        method: "PUT", // or PATCH if your backend supports it
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ amount: newAmount }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update expense");
    }

    // Optionally refresh or update local state based on response
    const updatedExpense = await response.json();
    console.log("Updated expense:", updatedExpense);
  };

  const handleSimulatePurchase = async () => {
    const id = categoryToId[newExpenseCategory];
    const purchaseAmountValue = parseFloat(purchaseAmount);
    if (isNaN(purchaseAmountValue)) {
      alert("Invalid purchase amount");
      return;
    }

    const newAmount = tempExpenses[newExpenseCategory] - purchaseAmount;
    if (newAmount < 0) {
      alert(
        "You have reached 0 for this category, you cannot make any more purchases to decrease the amount further"
      );
      return;
    }

    if (newAmount < 10) {
      // Change this value to adjust the threshold
      alert("You are getting close to 0 for this category");
    }

    setTempExpenses((prevState) => ({
      ...prevState,
      [newExpenseCategory]: newAmount,
    }));
    setExpenses((prevState) => ({
      ...prevState,
      [newExpenseCategory]: newAmount,
    }));

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await updateExpense(id, newAmount, jwtToken);
    } catch (error) {
      console.error("Error updating expense:", error);
    }

    setShowPurchaseModal(false);
  };

  useEffect(() => {
    // Get the state from local storage when the component is mounted
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const savedTempExpenses = JSON.parse(localStorage.getItem("tempExpenses"));
    const savedGoalFields = JSON.parse(localStorage.getItem("goalFields"));
    const savedTotalBudget = JSON.parse(localStorage.getItem("totalBudget"));
    const savedCategoryToId = JSON.parse(localStorage.getItem("categoryToId"));

    if (savedExpenses) setExpenses(savedExpenses);
    if (savedTempExpenses) setTempExpenses(savedTempExpenses);
    if (savedGoalFields) setGoalFields(savedGoalFields);
    if (savedTotalBudget) setTotalBudget(savedTotalBudget);
    if (savedCategoryToId) setCategoryToId(savedCategoryToId);
  }, []);

  useEffect(() => {
    // Store the state in local storage whenever it changes
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("tempExpenses", JSON.stringify(tempExpenses));
    localStorage.setItem("goalFields", JSON.stringify(goalFields));
    localStorage.setItem("totalBudget", JSON.stringify(totalBudget));
    localStorage.setItem("categoryToId", JSON.stringify(categoryToId));
  }, [expenses, tempExpenses, goalFields, totalBudget, categoryToId]);

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
          const fetchedCategoryToId = {};
          expensesData.forEach((expense) => {
            fetchedExpenses[expense.category.name] = expense.amount;
            fetchedCategoryToId[expense.category.name] = expense.id;
          });
          console.log(
            "What is the fetchedCategoryID " + fetchedCategoryToId.id
          );
          setExpenses(fetchedExpenses);
          setTempExpenses(fetchedExpenses);
          setCategoryToId(fetchedCategoryToId);
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
          showPurchaseModal={showPurchaseModal}
          setPurchaseModal={setShowPurchaseModal}
        />
      )}
      {showPurchaseModal && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowPurchaseModal(false)}
            >
              X
            </button>
            <h3 className="modal-title">Simulate Purchase</h3>
            <input
              className="modal-input"
              type="number"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
            />
            <button className="save-changes" onClick={handleSimulatePurchase}>
              Submit
            </button>
          </div>
        </div>
      )}
      {showInstruction && <Instruction closeInstruction={closeInstruction} />}
      <hr />
      <div>
        <ul>
          {Object.entries(expenses).map(([category, amount]) => (
            <li className="expenses-item-list" key={category}>
              <div className="expense-category">{category}</div>
              <button
                className="increase-button"
                onClick={() => handleIncrease(category)}
              >
                +
              </button>
              <span
                className="expenses-monetary-amount"
                style={{
                  color: tempExpenses[category] > amount ? "red" : "green",
                }}
              >
                ${tempExpenses[category]?.toFixed(2)}
              </span>
              <button
                className="decrease-button"
                onClick={() => handleDecrease(category)}
              >
                -
              </button>
              <div className="buttons-per-expense">
              <button
                className="remove-expense-button"
                onClick={() => handleRemoveExpense(category)}
              >
                Remove Expense
              </button>
              <button
                className="simulate-purchase-button"
                onClick={() => openPurchaseModal(category)}
              >
                Simulate Purchase
              </button>
              </div>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Expenses;
