import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Tooltip from '@mui/material/Tooltip';

const DepositsCard = ({ depositType, code }) => {
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/info');
        const data = await response.json();
        const selected = data.Deposits[depositType];
        setSelectedDeposit(selected);
      } catch (error) {
        console.error('Ошибка при получении данных о депозитах:', error);
      }
    };

    fetchData();
  }, [depositType]);

  return (
    <div id={depositType}>
      {selectedDeposit && (
        
        <div className='depositecard-container'>
          <Tooltip title={selectedDeposit.Tooltip}>
          <img src={selectedDeposit.LogoURL} alt="Logo" />
          </Tooltip>
          <div className='containerText'>
          <h2>{selectedDeposit.Description}</h2>
          <p>Процентные ставки: <span style={{ fontWeight: 'bold' }}>{selectedDeposit.InterestRate}</span></p>
          <p>Сроки вкладов: <span style={{ fontWeight: 'bold' }}>{selectedDeposit.DepositTerms}</span></p>
          <p>Минимальная сумма вклада: <span style={{ fontWeight: 'bold' }}>{selectedDeposit.MinimumDepositAmount}</span></p>
          <p>Возможность пополнения и частичного снятия: <span style={{ fontWeight: 'bold' }}>{selectedDeposit.DepositReplenishmentAndPartialWithdrawal}</span></p>
          <p>Условия начисления процентов: <span style={{ fontWeight: 'bold' }}>{selectedDeposit.InterestAccrualConditions}</span></p>          
          <Modal
            description={selectedDeposit.Description}
            code={code}
            logoURL={selectedDeposit.LogoURL}
            comment={selectedDeposit.Comment}
          />
          </div>
        </div>
        
      )}
    </div>
  );
};

export default DepositsCard;
