import React from 'react';
import useServices from '../../hooks/useService';

const ManageServices = () => {
  const [services, setServices] = useServices();

  const handleDelete = (id) => {
    const allow = window.confirm('Are you sure?');
    if (allow) {
      //   console.log('OK');
      fetch(`https://cryptic-tundra-94878.herokuapp.com/service/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const reamining = services.filter((service) => service._id !== id);
          setServices(reamining);
        });
    }
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Manage Services</h2>
      {services.map((service) => (
        <div key={service._id}>
          <h6>
            {service.name}{' '}
            <button
              onClick={() => handleDelete(service._id)}
              className="btn btn-danger"
            >
              x
            </button>
          </h6>
        </div>
      ))}
    </div>
  );
};

export default ManageServices;
