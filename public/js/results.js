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
                    resultsSection.innerHTML = ''; // Limpiar los resultados anteriores
                    if (data && data.length > 0) {
                        data.forEach((order, index) => {
                            const resultDiv = document.createElement('div');
                            resultDiv.classList.add('result-item');
                            if (index === 1) resultDiv.classList.add('orange');
                            if (index === 2) resultDiv.classList.add('green');
                            resultDiv.innerHTML = `
                                <div style="display: flex; justify-content: space-between;">
                                    <div>
                                        <p class="no-pedido"><strong>No de pedido:</strong> ${order.id}</p>
                                    </div>
                                    <div>
                                        <p class="fecha-compra"><strong>Fecha de la compra:</strong> ${order.date}</p>
                                    </div>
                                </div>
                                <hr class="linea">
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="text-align: center;">
                                        <img src="../public/img/ESTADO1.png" alt="Logo" style="width: 25px; height: 25px;">
                                        <p class="pedido-realizado"><strong>Pedido Realizado:</strong></p>
                                        <p class="fecha-realizado">${order.statusDate}</p>
                                    </div>
                                    <div>
                                        ${index >= 1 ? `<div><p><strong>Estamos preparando tu pedido:</strong></p><p>${order.preparingDate}</p></div>` : ''}
                                        ${index >= 2 ? `<div><p><strong>Tu pedido fue despachado:</strong></p><p>${order.shippedDate}</p></div>` : ''}
                                    </div>
                                </div>
                                <div class="total-compra">
                                    <p><strong>Total de la compra:</strong> $<span class="total-compra-valor">${order.total.toFixed(2)}</span></p>
                                </div>
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
