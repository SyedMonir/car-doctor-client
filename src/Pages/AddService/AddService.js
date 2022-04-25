import React from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = `http://localhost:5000/service`;
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Please Add Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        <input
          placeholder="Name"
          className="mb-2"
          {...register('name', { required: true, maxLength: 20 })}
        />
        <textarea
          placeholder="description"
          className="mb-2"
          {...register('description')}
        />
        <input
          placeholder="Price"
          className="mb-2"
          type="number"
          {...register('price')}
        />
        <input
          placeholder="Service Photo Link"
          className="mb-2"
          type="text"
          {...register('img')}
        />
        <input placeholder="Add-Service" className="mb-2" type="submit" />
      </form>
    </div>
  );
};

export default AddService;
