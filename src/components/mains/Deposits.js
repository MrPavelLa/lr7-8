import React from 'react';
import DepositsCard from './DepositsCard';
import DepositsInfoCard from './DepositsInfoCard';
const Deposits = (props) => {
  const depositTypes = ['Расчетные', 'Накопительные', 'Валютные'];

  return (
    <div>     
      <DepositsInfoCard depositInfo={props.code} />
      {depositTypes.map((type, index) => (
        <DepositsCard key={index} depositType={type} code={props.code} />
      ))}
    </div>
  );
};

export default Deposits;

