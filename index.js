const apiurl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// Fetching data using async/await
async function fetchDataAsync() {
    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Fetching data using .then
function fetchDataThen() {
    fetch(apiurl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => renderTable(data))
        .catch(error => console.error('Error fetching data:', error.message));
}

function renderTable(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${item.symbol}</td>
            <td><img src="${item.image}" style="width: 30px; height: 30px;"></td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

function searchData() {
    const searchValue = document.getElementById('input-text').value.toLowerCase();
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchValue) || item.symbol.toLowerCase().includes(searchValue));
    renderTable(filteredData);
}

function sortByMarketCap() {
    data.sort((a, b) => b.market_cap - a.market_cap);
    renderTable(data);
}

function sortByPercentageChange() {
    data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(data);
}

// Initial data fetch using async/await
fetchDataAsync();