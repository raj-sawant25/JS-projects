document.addEventListener("DOMContentLoaded", ()=> {
    const expenseForm = document.getElementById("expense-form")
    const expenseNameInput = document.getElementById("expense-name")
    const expenseAmountInput = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const TotalAmountDisplay = document.getElementById("total-amount")

    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    let TotalAmount = calTotal()

    renderExpenses()
    updateTotal()

    function calTotal(){
        return expenses.reduce((sum,expense) =>sum + expense.amount ,0)
    }

    function saveExpensesToLocal(){
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
    
    function updateTotal() {
        TotalAmount = calTotal()
        TotalAmountDisplay.textContent = TotalAmount.toFixed(2)
    }

    function renderExpenses(){
        expenseList.innerHTML=""
        expenses.forEach(expense => {
            let list= document.createElement('li')
            list.innerHTML=`
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `
            expenseList.appendChild(list)
        })
    }

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value)

        if(name !== "" && amount > 0 && !isNaN(amount)){
            const newexpense = {
                id : Date.now(),
                name : name,
                amount : amount
            }
            expenses.push(newexpense)
            saveExpensesToLocal()
            renderExpenses()
            updateTotal()

            expenseNameInput.value=""
            expenseAmountInput.value=""
        }
    })

    expenseList.addEventListener("click", (e) => {
        if(e.target.tagName==='BUTTON'){
            const expenseID = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter(expense => expense.id != expenseID)

            saveExpensesToLocal()
            renderExpenses()
            updateTotal()
        }
    })
})