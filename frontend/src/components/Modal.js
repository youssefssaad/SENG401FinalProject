import React, {useState} from "react";
import "../index.css";

function Modal({
                   closeModal,
                   updateGoalsInExpenses,
                   totalBudget,
                   goalFields: initialGoalFields,
                   handleSaveExpense,
                   ensureCategoryExists,
                   checkCategoryUsage,
                   expenseIDs,
                   expenses
               }) {
    const [goalFields, setGoalFields] = useState(initialGoalFields || [{id: 1, goal: "", percentage: 0}]);
    const [inputTotalBudget, setInputTotalBudget] = useState(totalBudget || 0); // Initialize with 0 if totalBudget is not provided

    console.log("what is the expensesIDs in the beginning here? " + expenseIDs);

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
            field.id === id ? {...field, [key]: value} : field
        );
        setGoalFields(updatedFields);
    };

    const handleTotalBudgetChange = (e) => {
        const newTotalBudget = parseFloat(e.target.value); // Parse input value as a float. this was horrible to code.
        setInputTotalBudget(newTotalBudget);
    };

    const removeGoal = async (id) => {
        const jwtToken = localStorage.getItem('jwtToken');

        if (!expenseIDs.length) {
            console.error("Expense IDs are not yet available");
            return;
        }

        try {
            const goal = goalFields.find(goal => goal.id === id);
            if (!goal) {
                console.error("Goal not found");
                return;
            }

            console.log("Deleting goal with category name: " + goal.goal);

            console.log("Current expenses:", Object.keys(expenses));

            const categoryKey = Object.keys(expenses).find(key => key === goal.goal);
            console.log("Matching category key:", categoryKey);
            if (!categoryKey) {
                console.log(`Category '${goal.goal}' not found in expenses`);
                return;
            }

            console.log("What the hell is the expenseIDs array here1? " + expenseIDs);

            //Will find the expenseID using the goal's cateogry name here
            const expenseIndex = Object.keys(expenses).indexOf(goal.goal);
            if (expenseIndex === -1) {
                console.error("Expense index not found for category:", goal.goal);
                return;
            }
            console.log("What is the expenseIndex here? " + expenseIndex);

            const expenseId = expenseIDs[expenseIndex];

            console.log("what the hell is the expenseId here? " + expenseId);

            // call the delete the expense endpoint
            const expenseResponse = await fetch(`http://localhost:8080/api/expenses/remove/${expenseId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                },
            });
            if (!expenseResponse.ok) {
                throw new Error("Failed to remove expense");
            }

            // Check if the category is used by any other expense
            const categoryUsed = await checkCategoryUsage(goal.goal);

            console.log("What is the goal.goal here? name? id?" + goal.goal);

            if (!categoryUsed) {
                //check to see if the category is not used by other expenses, then deletes the category
                //added this extra method in the backend
                // Assuming the goal.goal is the name here.
                const categoryResponse = await fetch(`http://localhost:8080/api/categories/removeByName/${goal.goal}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    },
                });
                if (!categoryResponse.ok) {
                    throw new Error("Failed to remove category");
                }
            }

            const updatedGoalFields = goalFields.filter(goalField => goalField.id !== id);
            setGoalFields(updatedGoalFields);
        } catch (error) {
            console.error("Error removing goal:", error);
        }
    };

    const saveGoals = async () => {
        for (const {goal, percentage} of goalFields) {
            if (goal.trim() === "" || percentage <= 0) {
                alert("Please ensure all goals have a name and a positive percentage.");
                return;
            }

            console.log("the actual fuck is happening here? " + goal);

            const categoryId = await ensureCategoryExists(goal); // Resolve category name to ID
            const amount = (inputTotalBudget * parseFloat(percentage)) / 100;

            console.log("What is the category name here 2? " + categoryId);
            console.log("What is the amount here in the saveGoal method? " + amount);

            await handleSaveExpense({categoryId, amount});
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
                {goalFields.map(({id, goal, percentage}) => (
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
