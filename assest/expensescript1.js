document.addEventListener("DOMContentLoaded", function () {
    const incomeDescription = document.getElementById("income-description");
    const incomeAmount = document.getElementById("income-amount");
    const incomeSubmit = document.getElementById("incomesubmit");
    
    const expenseDescription = document.getElementById("expense-description");
    const expenseCategory = document.getElementById("expense-category");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseSubmit = document.getElementById("expensesubmit");
    
    const transactionHistory = document.getElementById("transaction-history");
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const balance = document.getElementById("balance");
    
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let incomeTotal = 0;
    let expensesTotal = 0;
    
    function updateSummary() {
        totalIncome.textContent = incomeTotal;
        totalExpenses.textContent = expensesTotal;
        balance.textContent = incomeTotal - expensesTotal;
    }
    
    function saveTransactions() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
    
    function loadTransactions() {
        transactions.forEach(({ type, description, amount }) => {
            addTransactionToDOM(type, description, amount);
            if (type === "income") {
                incomeTotal += Number(amount);
            } else {
                expensesTotal += Number(amount);
            }
        });
        updateSummary();
    }
    
    function validateInput(description, amount) {
        if (description.value.trim() === "") {
            alert("Please enter a valid description.");
            return false;
        }
        if (amount.value.trim() === "" || isNaN(amount.value) || Number(amount.value) <= 0) {
            alert("Please enter a valid amount.");
            return false;
        }
        return true;
    }
    
    function addTransaction(type, description, amount) {
        transactions.push({ type, description, amount });
        saveTransactions();
        addTransactionToDOM(type, description, amount);
        
        if (type === "income") {
            incomeTotal += Number(amount);
        } else {
            expensesTotal += Number(amount);
        }
        updateSummary();
    }
    
    function addTransactionToDOM(type, description, amount) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${description}</td><td>${amount}</td>`;
        transactionHistory.appendChild(row);
    }
    
    incomeSubmit.addEventListener("click", function () {
        if (validateInput(incomeDescription, incomeAmount)) {
            addTransaction("income", incomeDescription.value, incomeAmount.value);
            incomeDescription.value = "";
            incomeAmount.value = "";
        }
    });
    
    expenseSubmit.addEventListener("click", function () {
        if (validateInput(expenseDescription, expenseAmount)) {
            addTransaction("expense", expenseDescription.value, expenseAmount.value);
            expenseDescription.value = "";
            expenseAmount.value = "";
        }
    });
    
    window.clearInputs = function () {
        if (confirm("Are you sure you want to clear all transactions?")) {
            transactionHistory.innerHTML = "";
            incomeTotal = 0;
            expensesTotal = 0;
            transactions = [];
            saveTransactions();
            updateSummary();
        }
    };
    
    loadTransactions();
});
