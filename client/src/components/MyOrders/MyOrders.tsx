// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./MyOrders.css"

// const MyOrders: React.FC = () => {
//   const orders = [
//     { id: 1, product: 'Product 1', quantity: 2, total: 20 },
//     { id: 2, product: 'Product 2', quantity: 1, total: 15 },
//     { id: 3, product: 'Product 3', quantity: 3, total: 30 },
//   ];

//   return (
//     <div className="order-container container mt-4">
//       <h2>ORDER HISTORY</h2>
//       <ul className="list-group list-group-flush">
//         {orders.map(order => (
//           <li key={order.id} className="list-group-item">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <h5>{order.product}</h5>
//                 <p>Quantity: {order.quantity}</p>
//                 <p>Total: ${order.total}</p>
//               </div>
            
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyOrders;
// OrderList.js

import { useState, useEffect } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders/all-orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Alla ordrar</h2>
      <ul>
        {orders.map(order => (
          <li key={order}>
            {/* Visa önskade orderuppgifter här */}
            <p>Order ID: {order}</p>
            <p>Cart: {JSON.stringify(order)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
