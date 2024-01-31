import React, { useState, useEffect } from 'react';
import "./MyOrders.css"

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const loggedInUsername = getLoggedInUsername();

  useEffect(() => {
    fetch(`http://localhost:3001/api/orders/all-orders/${loggedInUsername}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Något gick fel - ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Fel vid hämtning av ordrar:', error.message);
      });
  }, [loggedInUsername]);

  return (
    <div className="order-container container mt-4">
      <h2>ORDER HISTORY</h2>
      <ul className="list-group list-group-flush">
        {orders.map(order => (
          <li key={order._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p>Purchase Date: {new Date(order.purchaseDate).toLocaleDateString()}</p>
                <ul>
                  {order.cart.map(item => (
                    <li key={item._id}>
                      <p>{item.productName}</p>
                      <p>Price: {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <p>Total price:</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getLoggedInUsername = () => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');

  if (loggedInUserString) {
    const loggedInUser = JSON.parse(loggedInUserString);
    return loggedInUser.username;
  } else {
    return null;
  }
};

export default MyOrders;
