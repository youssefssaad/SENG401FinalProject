// Budget.js
import React, { useState , useEffect} from 'react';
import { PieChart } from 'react-minimal-pie-chart'; // Make sure to install this package
import { saveAs } from 'file-saver'; // Make sure to install file-saver for CSV export
import Navbar from '../components/Navbar';
import axios from "axios";

function Budget() {
    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [categories, setCategories] = useState([]);
    const savings = budget - expenses;
    const savingsPercentage = (savings / budget) * 100;

    useEffect(() =>{
        fetchUserExpenses();
        fetchUserBudget();
    }, []);

    async function fetchUserBudget() {
        try {
            const url = 'http://localhost:8080/api/budget/user/' + localStorage.getItem("userId");
            const response = await axios.get(url, {});
            const data = response.data;

            if (data) {
                console.log(data);
                setBudget(data["budget"])
            } else {
                alert("Searching for a user budget has failed. Please ensure that you have set a budget in the Expenses Tab");
            }
        } catch (error) {
            console.error("error:", error);
            alert("Error when fetching user budget");
        }
    }

    async function fetchUserExpenses() {
        try {
            const url = 'http://localhost:8080/api/expenses/user/' + localStorage.getItem("userId");
            const response = await axios.get(url, {});
            const data = response.data;

            if (data) {
                console.log(data);

                let totalExpensesValue = 0;
                let expensesChartData = [];

                for (let i = 0; i < data.length; i++) {
                    // set total expenses value
                    totalExpensesValue += data[i]["amount"];

                    //initializing data for pie chart
                    const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
                    let currentPieData ={
                        title: data[i]["category"]["name"],
                        value: data[i]["amount"],
                        color: randomColor
                    };
                    expensesChartData.push(currentPieData);
                }

                setCategories(expensesChartData);
                setExpenses(totalExpensesValue);

            } else {
                alert("Searching for expenses has failed. Please ensure that you have created expenses in the Expenses Tab");
            }
        } catch (error) {
            alert("Error when fetching user expenses");
        }
    }

    // Generate CSV content from expenses data
    const generateCSV = () => {
        let csvContent = "";
        csvContent += "Category,Amount\n";
        categories.forEach(category => {
            csvContent += `${category.title},${category.value}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        let user =JSON.parse(localStorage.getItem('user'));
        saveAs(blob, user.name + "_Expenses.csv");
    };

    return (
        <div>
            <Navbar/>
            <div className='budget'>
                <h1>Budget Overview</h1>
                <p>Total Monthly Expenses: ${expenses}</p>
                <p>Total Budget: ${budget}</p>
                <p>Percentage of Budget Left: {savingsPercentage.toFixed(2)}%</p>

                <h2>Analytics</h2>
                <div>
                    <h3>Budget Variance</h3>
                    <p>Categories Spent On: {categories.length}</p>
                    <h3>Income Analysis</h3>
                    <div style={{display: "flex"}}>
                        <PieChart className='piechart' data={categories}/>

                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            {categories.map(category => (
                                <tr key={category.title}>
                                    <div style={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                                        <div style={{
                                            border: "black",
                                            borderStyle: "solid",
                                            borderColor: category.color,
                                            width: "20px",
                                            height: "20px",
                                            background: category.color
                                        }}></div>
                                        <div style={{marginLeft: "10px"}}>{category.title}</div>
                                        <div style={{marginLeft: "10px"}}>(${category.value} )</div>
                                    </div>
                                </tr>
                            ))}
                        </div>


                    </div>
                </div>

                <h2>Exporting</h2>
                <button onClick={generateCSV}>Export Transaction History as CSV</button>
            </div>
        </div>
    );
}

export default Budget;