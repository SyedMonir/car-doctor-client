import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetails from '../../../hooks/useServiceDetails';

const Checkout = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user, setUser] = useState({
    name: 'Akbar Bodda',
    email: 'Akbar@Bodda.com',
    address: 'Road Akbar Bodda',
    phone: '0987654321',
  });

  const handleAddressChange = (e) => {
    // setUser{user.address : };
    const { address, ...rest } = user;
    const newAddress = e.target.value;
    const newUser = { address: newAddress, ...rest };
    setUser(newUser);
  };
  return (
    <div className="w-50 mx-auto">
      <h4>
        Please Checkout your booking
        {service.name}
      </h4>

      <form>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user.name}
          placeholder="Name"
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          value={service.name}
          placeholder="Service"
          required
        />
        <br />
        <input
          onChange={handleAddressChange}
          className="w-100 mb-2"
          type="text"
          name="address"
          value={user.address}
          placeholder="Address"
          required
        />
        <input
          className="w-100 mb-2"
          type="number"
          name="phone"
          value={user.phone}
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
