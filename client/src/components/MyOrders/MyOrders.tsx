import React, { useState, useEffect } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const loggedInUsername = getLoggedInUsername();

  useEffect(() => {
    const loggedInUsername = getLoggedInUsername();

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
      <h2 className="mb-4">ORDER HISTORY</h2>
      {orders.length === 0 ? (
        <h5>You have no order history yet.</h5>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card mb-4">
            <div className="card-header">
              <h5>Purchase Date: {new Date(order.orderDate).toLocaleDateString()}</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {order.cart.map(item => (
                  <li key={item._id} className="list-group-item">
                    <p>Order Id: {item._id}</p>
                    <p>{item.productName}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
              {/* <p className="mt-3">Total price:</p> */}
            </div>
          </div>
        ))
      )}
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
