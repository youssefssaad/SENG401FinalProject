import React, { useState } from "react";
import "../index.css";

function Instruction({ closeInstruction }) {
  return (
    <div className="modal fade-in">
      <div className="modal-content">
        <button className="close-button" onClick={closeInstruction}>
          X
        </button>
        <h3 className="modal-title">Instructions</h3>

        <p className="expenses-instruction">
          This page allows you to set your budget and expenses and track them
          accordingly. In the top right corner of the page, there is a blue plus
          sign from which you can add your goals per category. These categories
          are unique to you and can range from rent to food to sport to travel,
          depending on your personal interest and where you ideally hope to
          spend your money. It is important to note that this tool is meant to
          be used for monthly expenses.
        </p>
        <p className="expenses-instruction">
          When the modal opens, you can add your goals individually by typing in
          the category and the PERCENTAGE of your income you wish to spend per
          month in that category. You can also add more fields by clicking the
          'ADD' button. You can remove a category by clicking the '-' button on
          the right of each button. After all the categories are added, you can
          click the 'SAVE' button to save your goals and exit out of the modal.
        </p>
        <p className="expenses-instruction">
          Outside, the modal, you can see the total budget and the expenses you
          have set based on the respective categories based on your percentage
          goals and total budget. Here, you can add your total monthly income,
          and below it, add how much you spent so far in the month for that
          category. If the spent money is coloured green, you have still met
          your financial goal. If the spent money is coloured red, you have
          spent more than your goal in that category. If you hover on top of the
          red categories, they will display the amount you have overspent.
        </p>
      </div>
    </div>
  );
}

export default Instruction;
