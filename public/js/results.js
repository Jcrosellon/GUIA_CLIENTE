document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    function formatDateMMDDYYYY(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    
    function formatDateLong(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = meses[date.getMonth()];
        const year = date.getFullYear();
        return `${day} de ${month}, ${year}`;
    }


    function formatDateWithTime(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = meses[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} de ${month}, ${year}. ${hours}:${minutes}`;
    }

    function fetchOrders() {
        const selectedDate = document.getElementById('datepickerInput').value;
        const searchParams = new URLSearchParams();
        if (search) {
            searchParams.append('search', search);
        }
        if (selectedDate) {
            searchParams.append('date', selectedDate);
        }

        fetch(`http://localhost:3000/api/search?keyword=${encodeURIComponent(search)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const resultsSection = document.querySelector('.results-section');
                resultsSection.innerHTML = ''; 
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
                                    <p class="fecha-compra"><strong>Fecha de la compra:</strong> ${formatDateMMDDYYYY(order.date)}</p>
                                </div>
                            </div>
                            <hr class="linea">
                            <div style="display: flex; justify-content: space-between;">
                                <div style="text-align: center;">
                                    <img src="../public/img/ESTADO1.png" alt="Logo" style="width: 25px; height: 25px;">
                                    <p class="pedido-realizado"><strong>Pedido Realizado:</strong></p>
                                    <p class="fecha-realizado">${formatDateLong(order.statusDate)}</p>
                                </div>
                                <div>
                                    ${index >= 1 ? `<div><p><strong>Estamos preparando tu pedido:</strong></p><p>${formatDateWithTime(order.preparingDate)}</p></div>` : ''}
                                    ${index >= 2 ? `<div><p><strong>Tu pedido fue despachado:</strong></p><p>${formatDateWithTime(order.shippedDate)}</p></div>` : ''}
                                </div>
                                <div class="total-compra" style="margin-left: auto;">
                                    <p><strong>Total de la compra:</strong> $<span class="total-compra-valor">${order.total.toFixed(2)}</span></p>
                                </div>
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
    }

    fetchOrders();

    setInterval(fetchOrders, 5000);

    
    flatpickr('#datepickerInput', {
        dateFormat: 'd-m-Y', 
        
        onChange: function(selectedDates, dateStr, instance) {
            fetchOrders(); 
        }
    });
});

