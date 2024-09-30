let expenseChart;
let totalEntries = 0;
let currentBalance = 0;
const categoryColors = {};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addFixedExpenseRow() {
    let tableBody = document.getElementById("monthly-expenses-body");
    let newRow = tableBody.insertRow();

    newRow.insertCell().innerHTML = '<input type="text"  id="input1">';
    newRow.insertCell().innerHTML = '<input type="date" id="input2">';
    
    newRow.insertCell().innerHTML = generateCategoryDropdown();
    newRow.insertCell().innerHTML = '<input type="number" oninput="updateCategoryExpenses()" id="input5">';
    newRow.insertCell().innerHTML = '<input type="checkbox" onclick="updateCategoryExpenses(); updateBalance()" id="input10">';
    newRow.insertCell().innerHTML = generatePaymentCategoryDropdown();
    newRow.insertCell().innerHTML = '<button class="remove-button" onclick="deleteFixedExpenseRow(this)" id="button2"><i class="bi bi-x" id="deleta"></i></button>';
}

function deleteFixedExpenseRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCategoryExpenses();
    updateBalance();
}

function addCategoryRow() {
    let tableBody = document.getElementById("category-expenses-body");
    let newRow = tableBody.insertRow();
    newRow.insertCell().innerHTML = '<input type="text" oninput="updateCategoryDropdown()" id="input6">';
    newRow.insertCell().innerHTML = '<input type="text" class="currency" onblur="formatCurrency(this); updateCategoryExpenses()" id="input7">';
    newRow.insertCell().innerHTML = '<input type="number"  readonly id="input8">';
    newRow.insertCell().innerHTML = '<input type="text" readonly id="input9">';
    newRow.insertCell().innerHTML = '<button class="remove-button" onclick="deleteRow(this)" id="button5"><i class="bi bi-x" id="deleta"></button>';
    updateCategoryDropdown();
}

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCategoryDropdown();
    updateCategoryExpenses();
}

function updateCategoryExpenses() {
    let categoryExpensesBody = document.getElementById("category-expenses-body");
    let monthlyExpensesBody = document.getElementById("monthly-expenses-body");

    let categoryData = {};
    let warnings = [];

    for (let i = 0; i < categoryExpensesBody.rows.length; i++) {
        let cells = categoryExpensesBody.rows[i].cells;
        let category = cells[0].getElementsByTagName("input")[0].value;
        let limit = parseFloat(cells[1].getElementsByTagName("input")[0].value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
        categoryData[category] = { limit: limit, spent: 0 };
    }

    for (let i = 0; i < monthlyExpensesBody.rows.length; i++) {
        let cells = monthlyExpensesBody.rows[i].cells;
        let category = cells[2].getElementsByTagName("select")[0].value;
        let value = parseFloat(cells[3].getElementsByTagName("input")[0].value) || 0;
        let isPaid = cells[4].getElementsByTagName("input")[0].checked;
        if (isPaid && categoryData[category]) {
            categoryData[category].spent += value;
        }
    }

    let labels = [];
    let data = [];
    let colors = [];
    warnings = [];

    for (let i = 0; i < categoryExpensesBody.rows.length; i++) {
        let cells = categoryExpensesBody.rows[i].cells;
        let category = cells[0].getElementsByTagName("input")[0].value;
        if (categoryData[category]) {
            let spent = categoryData[category].spent;
            let limit = categoryData[category].limit;
            let percentage = (limit === 0) ? 0 : (spent / limit) * 100;
            cells[2].getElementsByTagName("input")[0].value = spent.toFixed(2);
            cells[3].getElementsByTagName("input")[0].value = percentage.toFixed(2) + '%';
            labels.push(category);
            data.push(spent);
            if (spent > limit) {
                warnings.push(`<h1 id="txt1">Atenção: A categoria "${category}" ultrapassou o limite de R$ ${limit.toFixed(2)}.</h1>`);
                // Exibir alerta com `alert`
                alert(`A categoria "${category}" ultrapassou o limite de R$ ${limit.toFixed(2)}.`);
                // Mudar a cor da categoria para vermelho
                cells[0].getElementsByTagName("input")[0].classList.add('over-budget');
            } else {
                cells[0].getElementsByTagName("input")[0].classList.remove('over-budget');
            }
            if (!categoryColors[category]) {
                categoryColors[category] = getRandomColor();
            }
            colors.push(categoryColors[category]);
        }
    }

    if (expenseChart) {
        expenseChart.destroy();
    }

    const ctx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gastos',
                data: data,
                backgroundColor: colors,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `R$ ${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function(value) {
                            return `R$ ${value}`;
                        }
                    }
                }
            }
        },
    });

    // Atualizar avisos
    document.getElementById('warnings-container').innerHTML = warnings.join('<br>');
}

function updateCategoryDropdown() {
    let categoryExpensesBody = document.getElementById("category-expenses-body");
    let monthlyExpensesBody = document.getElementById("monthly-expenses-body");
    let categoryOptions = "";

    for (let i = 0; i < categoryExpensesBody.rows.length; i++) {
        let category = categoryExpensesBody.rows[i].cells[0].getElementsByTagName("input")[0].value;
        if (category) {
            categoryOptions += `<option value="${category}">${category}</option>`;
        }
    }

    for (let i = 0; i < monthlyExpensesBody.rows.length; i++) {
        let categorySelect = monthlyExpensesBody.rows[i].cells[2].getElementsByTagName("select")[0];
        categorySelect.innerHTML = categoryOptions;
    }
}

function updateBalance() {
    let totalExpenses = 0;
    let totalEntries = parseFloat(document.getElementById('total-entry-amount').innerText.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
    let monthlyExpensesBody = document.getElementById("monthly-expenses-body");

    for (let i = 0; i < monthlyExpensesBody.rows.length; i++) {
        let cells = monthlyExpensesBody.rows[i].cells;
        let value = parseFloat(cells[3].getElementsByTagName("input")[0].value) || 0;
        let isPaid = cells[4].getElementsByTagName("input")[0].checked;
        if (isPaid) {
            totalExpenses += value;
        }
    }

    currentBalance = totalEntries - totalExpenses;
    document.getElementById('balance').textContent = `Saldo Disponível: R$ ${currentBalance.toFixed(2)}`;

    // Update expense output
    updateExpenseOutput(totalExpenses);
}

function updateExpenseOutput(totalExpenses) {
    let expenseOutputBody = document.getElementById("expense-output-body");
    expenseOutputBody.innerHTML = '';

    let rows = document.querySelectorAll('#monthly-expenses-body tr');
    let totalExpense = 0;

    rows.forEach(row => {
        let cells = row.cells;
        let category = cells[2].getElementsByTagName("select")[0].value;
        let value = parseFloat(cells[3].getElementsByTagName("input")[0].value) || 0;
        let isPaid = cells[4].getElementsByTagName("input")[0].checked;
        let paymentCategory = cells[5].getElementsByTagName("select")[0].value;

        if (isPaid) {
            let newRow = expenseOutputBody.insertRow();
            newRow.insertCell().innerText = `${category} (${paymentCategory})`;
            newRow.insertCell().innerText = `R$ ${value.toFixed(2)}`;
            totalExpense += value;
        }
    });

    document.getElementById('total-expense-amount').innerText = totalExpense.toFixed(2);
}

function formatCurrency(input) {
    let value = parseFloat(input.value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
    input.value = value.toFixed(2);
}

function generateCategoryDropdown() {
    let categoryOptions = "";
    let categoryExpensesBody = document.getElementById("category-expenses-body");
    for (let i = 0; i < categoryExpensesBody.rows.length; i++) {
        let category = categoryExpensesBody.rows[i].cells[0].getElementsByTagName("input")[0].value;
        if (category) {
            categoryOptions += `<option value="${category}" id="input3">${category}</option>`;
        }
    }
    return `<select id="select3" >${categoryOptions}</select>`;
}

function addEntry() {
    let amount = parseFloat(document.getElementById('entry-amount').value) || 0;

    if (amount > 0) {
        let entryOutputBody = document.getElementById("entry-output-body");
        let newRow = entryOutputBody.insertRow();
       

        totalEntries += amount;
        document.getElementById('total-entry-amount').innerText = totalEntries.toFixed(2);

        // Clear input
        document.getElementById('entry-amount').value = '';

        updateBalance();
    }
}

function generatePaymentCategoryDropdown() {
    return `
        <select id="select1">
            <option value="Débito" id="option1"></option>
            <option value="Crédito" id="option1">Crédito</option>
            <option value="Outro" id="option1">Outro</option>
            <option value="Débito" id="option1">Débito</option>
        </select>`;
}