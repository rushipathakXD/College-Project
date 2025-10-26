
// Orders page logic: render orders from localStorage, per user
function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function getUserOrdersKey() {
  const user = getCurrentUser();
  return user ? `orders_${user}` : null;
}

function getOrders() {
  const key = getUserOrdersKey();
  if (!key) return [];
  let orders = localStorage.getItem(key);
  return orders ? JSON.parse(orders) : [];
}

function showLoginPopup(msg) {
  if (document.getElementById('login-popup')) return;
  let popup = document.createElement('div');
  popup.id = 'login-popup';
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.width = '100vw';
  popup.style.height = '100vh';
  popup.style.background = 'rgba(0,0,0,0.4)';
  popup.style.display = 'flex';
  popup.style.justifyContent = 'center';
  popup.style.alignItems = 'center';
  popup.style.zIndex = '9999';
  popup.innerHTML = `<div style="background:#fff;padding:32px 40px;border-radius:18px;box-shadow:0 4px 24px #0002;text-align:center;max-width:90vw;">
    <h3 style='color:#6759ff;margin-bottom:12px;'>Login Required</h3>
    <p style='color:#333;margin-bottom:18px;'>${msg||'Please login to continue.'}</p>
    <a href="../pages/account.html" style="padding:10px 28px;background:#ffc034;color:#fff;border-radius:50px;text-decoration:none;font-weight:600;">Go to Login</a>
    <br><br><button onclick="document.getElementById('login-popup').remove()" style="margin-top:8px;padding:6px 18px;border-radius:8px;border:none;background:#eee;cursor:pointer;">Close</button>
  </div>`;
  document.body.appendChild(popup);
}


function renderOrders() {
  if (!getCurrentUser()) {
    showLoginPopup('You must login to view your orders.');
    return;
  }
  const ordersList = document.getElementById('orders-list');
  const emptyOrders = document.getElementById('empty-orders');
  const orders = getOrders();
  if (!orders.length) {
    ordersList.innerHTML = '';
    emptyOrders.style.display = 'block';
    return;
  }
  emptyOrders.style.display = 'none';
  ordersList.innerHTML = '';
  orders.slice().reverse().forEach(order => {
    ordersList.innerHTML += `
      <div class="order-card">
        <div class="order-header">
          <span class="order-number">Order #${order.orderNumber}</span>
          <span class="order-status">${order.status}</span>
        </div>
        <div class="order-details">
          <div class="order-items"><b>Items:</b> ${order.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</div>
          <div class="order-total"><b>Total:</b> ₹${order.total}</div>
          <div class="order-address"><b>Address:</b> ${order.address}</div>
          <div class="order-payment"><b>Payment:</b> ${order.paymentMode}</div>
        </div>
      </div>
    `;
  });
}

document.addEventListener('DOMContentLoaded', renderOrders);
