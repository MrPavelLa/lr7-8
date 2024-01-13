import React, { useState } from 'react';
import axios from 'axios';

const Poluch = (props) => {
  const [data, setData] = useState('');

  const fetchData = async (format) => {
    try {
      const response = await axios.get(`http://localhost:3002/getData/${props.code}/${format}`);
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  return (
    <div className='ReplenishmentCont'>
      <button onClick={() => fetchData('json')}>Получить JSON</button>
      <button onClick={() => fetchData('xml')}>Получить XML</button>
      <button onClick={() => fetchData('html')}>Получить HTML</button>
      <div>
        <pre>{typeof data === 'object' ? JSON.stringify(data, null, 2) : data}</pre>
      </div>
    </div>
  );
};

export default Poluch;

