'use client';

import { useState, useEffect } from 'react';
import { getData } from './data';

export default function NodeStackPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataFromAPI = await getData();
      setData(dataFromAPI);
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1>Node_stack</h1>
      <ul>
        {data.map(stack => (
          <li key={stack.id}>
            {stack.rssi}
          </li>
        ))}
      </ul>
    </div>
  );
}
