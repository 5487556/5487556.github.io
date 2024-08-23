document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 獲取表單數據
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // 將數據保存到 Firestore
    db.collection("transactions").add({
        date: date,
        description: description,
        amount: amount,
        type: type,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("交易已成功保存！");
        alert('交易已成功保存！');
        loadTransactions();  // 保存後重新載入交易列表
    })
    .catch((error) => {
        console.error("保存交易時出錯: ", error);
        alert('交易保存失敗，請重試。');
    });

    // 清空表單
    document.getElementById('transaction-form').reset();
});

// 載入並顯示交易記錄
function loadTransactions() {
    db.collection("transactions").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        const transactionList = document.getElementById('transaction-list');
        transactionList.innerHTML = '';  // 清空現有記錄

        let cashBalance = 1000;  // 初始現金餘額

        querySnapshot.forEach((doc) => {
            const transaction = doc.data();
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type}</td>
                <td><button onclick="deleteTransaction('${doc.id}')">刪除</button></td>
            `;

            // 計算餘額
            if (transaction.type === 'income') {
                cashBalance += transaction.amount;
            } else if (transaction.type === 'expense') {
                cashBalance -= transaction.amount;
            }

            transactionList.appendChild(row);
        });

        // 更新現金餘額顯示
        document.getElementById('cash-balance').innerText = `${cashBalance} 元`;
    });
}

// 刪除交易
function deleteTransaction(id) {
    db.collection("transactions").doc(id).delete().then(() => {
        console.log("交易已刪除！");
        loadTransactions();  // 刪除後重新載入交易列表
    }).catch((error) => {
        console.error("刪除交易時出錯: ", error);
    });
}

// 初始化加載交易記錄
loadTransactions();