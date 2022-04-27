import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axios.private';
import auth from '../../firebase.init';

const Order = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      const email = user?.email;
      const url = `https://cryptic-tundra-94878.herokuapp.com/orders?email=${email}`;
      try {
        const { data } = await axiosPrivate.get(url);
        // const { data } = await axios.get(url, {
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //   },
        // });
        setOrders(data);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate('/login');
        }
      }
    };
    getOrders();
  }, [user?.email]);
  return (
    <div className="w-50 mx-auto">
      <h3>Your Orders {orders.length} </h3>
      {orders.map((order) => (
        <div key={order._id}>
          <h5>{order?.service}</h5>
          <p>{order?.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Order;
