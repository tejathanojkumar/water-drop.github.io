document.addEventListener('DOMContentLoaded', () => {
  displayOrders();
});

document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const order = {
    id: Date.now(),
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    bottleSize: document.getElementById('bottle-size').value,
    quantity: document.getElementById('quantity').value,
    status: 'Pending',
    timestamp: new Date().toISOString()
  };
  
  // Save to localStorage
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Submit to Formspree
  const form = document.getElementById('order-form');
  form.submit();
  
  // Display success message
  document.getElementById('message').textContent = 'Order submitted! Check your orders below.';
  document.getElementById('order-form').reset();
  
  // Update order display
  displayOrders();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();
          document.getElementById('address').value = data.display_name || 'Location not found';
        } catch {
          document.getElementById('address').value = 'Error fetching address';
        }
      },
      () => {
        document.getElementById('address').value = 'Unable to get location';
      }
    );
  } else {
    document.getElementById('address').value = 'Geolocation not supported';
  }
}

function displayOrders() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const tbody = document.getElementById('order-display');
  tbody.innerHTML = '';
  orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.name}</td>
      <td>${order.bottleSize}</td>
      <td>${order.quantity}</td>
      <td>${order.status}</td>
      <td>
        ${order.status === 'Pending' ? `<button class="btn btn-sm btn-success" onclick="markDelivered(${order.id})">Mark Delivered</button>` : 'Delivered'}
      </td>
    `;
    tbody.appendChild(row);
  });
}

function markDelivered(orderId) {
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders = orders.map(order => {
    if (order.id === orderId) {
      order.status = 'Delivered';
    }
    return order;
  });
  localStorage.setItem('orders', JSON.stringify(orders));
  displayOrders();
}