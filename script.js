/**
 * Представляет транзакцию
 * @typedef {Object} Transaction
 * @property {string} id - Уникальный идентификатор
 * @property {string} date - Дата и время
 * @property {number} amount - Сумма
 * @property {string} category - Категория
 * @property {string} description - Описание
 */

/**
 * Массив для хранения транзакций
 * @type {Transaction[]}
 */
let transactions = [];

/**
 * Добавляет транзакцию в таблицу и обновляет общую сумму
 * @param {Event} event - Событие отправки формы
 */
function addTransaction(event) {
    event.preventDefault();
    const form = event.target;
    const amount = parseFloat(form.elements.amount.value);
    const category = form.elements.category.value;
    const description = form.elements.description.value;
    const id = Date.now().toString();

    const transaction = {
        id,
        date: new Date().toLocaleString(),
        amount,
        category,
        description
    };

    transactions.push(transaction);
    updateTransactionTable();
    calculateTotal();
    form.reset();
}

/**
 * Обновляет таблицу транзакций
 */
function updateTransactionTable() {
    const tableBody = document.querySelector('#transaction-table tbody');
    tableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td><button onclick="deleteTransaction('${transaction.id}')">Удалить</button></td>
        `;
        if (transaction.category === 'income') {
            row.classList.add('income');
        } else if (transaction.category === 'expense') {
            row.classList.add('expense');
        }
        tableBody.appendChild(row);
    });
}

/**
 * Удаляет транзакцию из таблицы и массива
 * @param {string} id - ID транзакции для удаления
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateTransactionTable();
    calculateTotal();
}

/**
 * Обновляет отображение общей суммы транзакций
 */
function calculateTotal() {
    const totalAmount = transactions.reduce((total, transaction) => {
        if (transaction.category === 'income') {
            return total + transaction.amount;
        } else if (transaction.category === 'expense') {
            return total - transaction.amount;
        }
        return total;
    }, 0);

    const totalAmountElement = document.querySelector('#total-amount');
    totalAmountElement.textContent = `Общая сумма: ${totalAmount.toFixed(2)}`;
}

// Обработчик события отправки формы
const form = document.querySelector('#add-transaction-form');
form.addEventListener('submit', addTransaction);

// Инициализация таблицы и отображения общей суммы
updateTransactionTable();
calculateTotal();
