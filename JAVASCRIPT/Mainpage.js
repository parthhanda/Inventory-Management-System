let products = [];
let totalSales = 0;

var logoutBtn = document.getElementById("logoutBtn");
logoutBtn.onclick = function () {
    alert("Logged out successfully!");
    window.location.reload();
};

const ctxPie = document.getElementById('stockChart').getContext('2d');
const ctxBar = document.getElementById('stockBarChart').getContext('2d');

let stockChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock Quantity Distribution',
            data: [],
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

let stockBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock Quantity Distribution',
            data: [],
            backgroundColor: '#36A2EB',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById('stockForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const pricePerItem = parseFloat(document.getElementById('price-per-item').value).toFixed(2);
    const totalPrice = (quantity * pricePerItem).toFixed(2);

    const product = { productName, initialQuantity: quantity, availableQuantity: quantity, pricePerItem, totalPrice };
    products.push(product);

    updateDashboard();
    renderStockTable();
    renderSalesTable();
    updateTotalStockTable();
    updateCharts();

    document.getElementById('stockForm').reset();
});

function updateDashboard() {
    const totalProducts = products.length;
    const totalStockValue = products.reduce((sum, p) => sum + parseFloat(p.totalPrice), 0).toFixed(2);

    document.getElementById('total-products').innerText = totalProducts;
    document.getElementById('total-stock-value').innerText = `₹${totalStockValue}`;
    document.getElementById('total-sales').innerText = `₹${totalSales.toFixed(2)}`;
}

function renderStockTable() {
    const stockTableBody = document.getElementById('StockTableBody');
    stockTableBody.innerHTML = '';

    products.forEach((product, index) => {
        const tableRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerText = product.productName;

        const quantityCell = document.createElement('td');
        quantityCell.innerText = product.initialQuantity;

        const priceCell = document.createElement('td');
        priceCell.innerText = `₹${product.pricePerItem}`;

        const totalPriceCell = document.createElement('td');
        totalPriceCell.innerText = `₹${product.totalPrice}`;

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button onclick="editProduct(${index})">Edit</button> <button onclick="deleteProduct(${index})">Delete</button>`;

        tableRow.appendChild(nameCell);
        tableRow.appendChild(quantityCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(totalPriceCell);
        tableRow.appendChild(actionCell);

        stockTableBody.appendChild(tableRow);
    });
}

function renderSalesTable() {
    const salesTableBody = document.getElementById('SalesTableBody');
    salesTableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerText = product.productName;

        const availableCell = document.createElement('td');
        availableCell.innerText = product.availableQuantity;

        const soldQuantityCell = document.createElement('td');
        soldQuantityCell.innerHTML = `<input type="number" min="1" max="${product.availableQuantity}" id="soldQty${index}" value="1">`;

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button onclick="sellProduct(${index})">Sell</button>`;

        row.appendChild(nameCell);
        row.appendChild(availableCell);
        row.appendChild(soldQuantityCell);
        row.appendChild(actionCell);

        salesTableBody.appendChild(row);
    });
}

function updateTotalStockTable() {
    const totalStockTableBody = document.getElementById('TotalStockTableBody');
    totalStockTableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerText = product.productName;

        const quantityCell = document.createElement('td');
        quantityCell.innerText = product.availableQuantity;

        const priceCell = document.createElement('td');
        priceCell.innerText = `₹${product.pricePerItem}`;

        const totalValueCell = document.createElement('td');
        totalValueCell.innerText = `₹${(product.availableQuantity * product.pricePerItem).toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(totalValueCell);

        totalStockTableBody.appendChild(row);
    });
}

function sellProduct(index) {
    const soldQty = parseInt(document.getElementById(`soldQty${index}`).value);
    if (soldQty <= 0 || soldQty > products[index].availableQuantity) {
        alert("Invalid quantity.");
        return;
    }

    const saleAmount = soldQty * products[index].pricePerItem;
    products[index].availableQuantity -= soldQty;
    totalSales += saleAmount;

    if (products[index].availableQuantity === 0) {
        products.splice(index, 1);
    }

    updateDashboard();
    renderSalesTable();
    updateTotalStockTable();
    updateCharts();
}

function editProduct(index) {
    const product = products[index];
    const newQuantity = prompt("Enter new quantity:", product.initialQuantity);
    if (newQuantity && !isNaN(newQuantity)) {
        product.initialQuantity = parseInt(newQuantity);
        product.availableQuantity = parseInt(newQuantity);
        product.totalPrice = (product.initialQuantity * product.pricePerItem).toFixed(2);

        updateDashboard();
        renderStockTable();
        renderSalesTable();
        updateTotalStockTable();
        updateCharts();
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    updateDashboard();
    renderStockTable();
    renderSalesTable();
    updateTotalStockTable();
    updateCharts();
}

function updateCharts() {
    stockChart.data.labels = products.map(p => p.productName);
    stockChart.data.datasets[0].data = products.map(p => p.availableQuantity);
    stockChart.update();

    stockBarChart.data.labels = products.map(p => p.productName);
    stockBarChart.data.datasets[0].data = products.map(p => p.availableQuantity);
    stockBarChart.update();
}