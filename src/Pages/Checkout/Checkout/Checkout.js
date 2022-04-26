import React from 'react';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import useServiceDetails from '../../../hooks/useServiceDetails';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user] = useAuthState(auth);
  // const [user, setUser] = useState({
  //   name: 'Akbar Bodda',
  //   email: 'Akbar@Bodda.com',
  //   address: 'Road Akbar Bodda',
  //   phone: '0987654321',
  // });

  // const handleAddressChange = (e) => {
  //   const { address, ...rest } = user;
  //   const newAddress = e.target.value;
  //   const newUser = { address: newAddress, ...rest };
  //   setUser(newUser);
  // };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios.post('http://localhost:5000/order', order).then((response) => {
      const { data } = response;
      if (data.insertedId) {
        toast.success('Your order is placed!');
        event.target.reset();
      }
    });
  };
  return (
    <div className="w-50 mx-auto">
      <h4>
        Please Checkout your booking
        {service.name}
      </h4>

      <form onSubmit={handlePlaceOrder}>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user?.displayName}
          placeholder="Name"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          name="email"
          value={user?.email}
          placeholder="Email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          value={service?.name}
          placeholder="Service"
          required
          readOnly
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          placeholder="Address"
          required
          autoComplete="off"
        />
        <input
          className="w-100 mb-2"
          type="number"
          name="phone"
          placeholder="Phone"
          required
        />
        <br />
        <input
          className="btn btn-primary"
          type="submit"
          value="Please order!"
        />
      </form>
    </div>
  );
};

export default Checkout;
