import { useEffect, useState } from 'react';

const useServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://cryptic-tundra-94878.herokuapp.com/service')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return [services, setServices];
};

export default useServices;
