let cashBalance = localStorage.getItem('cashBalance') ? parseFloat(localStorage.getItem('cashBalance')) : 1000;

function updateCashBalance() {
    document.getElementById('cash-balance').textContent = cashBalance + ' 元';
    localStorage.setItem('cashBalance', cashBalance);
}

function loadTransactions() {
    fetch('http://localhost:3000/api/transactions')
        .then(response => response.json())
        .then(transactions => {
            transactions.forEach(transaction => {
                const newRow = `<tr>
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type === 'income' ? '收入' : '支出'}</td>
                <td><a href="#">編輯</a> | <a href="#">刪除</a></td>
            </tr>`;
                document.querySelector('table tbody').insertAdjacentHTML('beforeend', newRow);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function saveTransaction(transaction) {
    fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Transaction saved:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.getElementById('transaction-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (type === 'income') {
        cashBalance += amount;
    } else if (type === 'expense') {
        cashBalance -= amount;
    }

    updateCashBalance();

    const transaction = { date, description, amount, type };
    saveTransaction(transaction);

    const newRow = `<tr>
                <td>${date}</td>
                <td>${description}</td>
                <td>${amount}</td>
                <td>${type === 'income' ? '收入' : '支出'}</td>
                <td><a href="#">編輯</a> | <a href="#">刪除</a></td>
            </tr>`;
    document.querySelector('table tbody').insertAdjacentHTML('beforeend', newRow);

    document.getElementById('transaction-form').reset();
});

updateCashBalance();
loadTransactions();