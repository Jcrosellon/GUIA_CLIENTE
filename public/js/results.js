document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    function fetchOrders() {
    if (search) {
        fetch(`http://localhost:3000/api/search?keyword=${encodeURIComponent(search)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const resultsSection = document.querySelector('.results-section');
                if (data && data.length > 0) {
                    data.forEach(order => {
                        const resultDiv = document.createElement('div');
                        resultDiv.classList.add('result-item');
                        resultDiv.innerHTML = `
                            <p>No de pedido: ${order.id}</p>
                            <p>Fecha de la compra: ${order.date}</p>
                            <hr>
                            <p>Pedido Realizado: ${order.statusDate}</p>
                            <p>Estamos preparando tu pedido: ${order.preparingDate}</p>
                            <p>Tu pedido fue despachado: ${order.shippedDate}</p>
                            <p>Tu pedido fue entregado: ${order.deliveredDate}</p>
                            <p>Total de la compra: $${order.total.toFixed(2)}</p>
                        `;
                        resultsSection.appendChild(resultDiv);
                    });
                } else {
                    resultsSection.textContent = 'No se encontraron resultados.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al buscar el pedido. Por favor, intenta de nuevo más tarde.');
            });
    } else {
        console.error('No se proporcionó ningún parámetro de búsqueda.');
    }
}
fetchOrders();

setInterval(fetchOrders, 5000);
});
