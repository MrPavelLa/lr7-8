import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Tooltip from '@mui/material/Tooltip';

const LoansCard = ({ loanType, code }) => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/info'); 
        const data = await response.json();
        const selected = data.Loans[loanType];
        setSelectedLoan(selected);
      } catch (error) {
        console.error('Ошибка при получении данных о вкладах:', error);
      }
    };

    fetchData();
  }, [loanType]);

  return (
    <div id={loanType}>
      {selectedLoan && (
        <div className='loancard-container'>          
        <Tooltip title={selectedLoan.Tooltip}>
          <img src={selectedLoan.LogoURL} alt="Logo" />
          </Tooltip>
          <div className='containerText'>
          <h2>{selectedLoan.Description}</h2>
          <p>Процентная ставка: <span style={{ fontWeight: 'bold' }}>{selectedLoan.InterestRate}</span></p>
          <p>Срок кредитования: <span style={{ fontWeight: 'bold' }}>{selectedLoan.LoanTerms}</span></p>
          <p>Минимальная сумма кредита: <span style={{ fontWeight: 'bold' }}>{selectedLoan.MinimumLoanAmount}</span></p>
          <p>Максимальная сумма кредита: <span style={{ fontWeight: 'bold' }}>{selectedLoan.MaximumLoanAmount}</span></p>
          <Modal
            description={selectedLoan.Description}
            code={code}
            logoURL={selectedLoan.LogoURL}
            comment={selectedLoan.Comment}
          />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansCard;
