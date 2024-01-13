import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Deposits from './Deposits';
import Loans from './Loans';
import Transaction from './Transaction';
import Payments from './Payments';
import Replenishment from './Replenishment';
import Poluch from './Poluch';
const Main = ({ code }) => {

  return (    
    <Routes>      
      <Route path="Deposits" element={<Deposits code={code} />} />
      <Route path="Loans" element={<Loans code={code} />} />
      <Route path="Transaction" element={<Transaction code={code} />} />    
      <Route path="Payments" element={<Payments code={code} />} />     
      <Route path="Replenishment" element={<Replenishment code={code} />} />
      <Route path="Poluch" element={<Poluch code={code} />} />
            
    </Routes>
  );
};

export default Main;
