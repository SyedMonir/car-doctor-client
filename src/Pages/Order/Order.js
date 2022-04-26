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
      const url = `http://localhost:5000/orders?email=${email}`;
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
    <div>
      <h3>Your Orders {orders.length} </h3>
      <h6>{orders?.service}</h6>
    </div>
  );
};

export default Order;
