import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [operationType, setOperationType] = useState('оплата');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [userAccounts, setUserAccounts] = useState([]);
  const [userCode, setUserCode] = useState('');
  const [Oname, setOname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users`);
        const userData = await response.json();
        const user = userData.find(user => user.code === props.code);
        if (user) {
          setUserAccounts(user.accounts);
          setCardNumber(user.accounts[0]); 
          setUserCode(user.code);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [props.code]);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleOperationTypeChange = (e) => {
    setOperationType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleONameChange = (e) => {
    setOname(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const getCurrentDateAndTime = () => {
    const currentDate = new Date();
    const id = currentDate.getTime();
    const date = currentDate.toISOString().slice(0, 10);
    const time = currentDate.toLocaleTimeString().slice(0, 5);
    return { date, time, id };
  };

  const handleConfirm = async () => {
    try {
      const { date, time, id } = getCurrentDateAndTime();

      const newData = {
        id,
        operationName: Oname,
        date,
        time,
        amount: Number(amount),
        category: operationType,
        accounts: cardNumber,
        target: accountNumber
      };

      const response = await axios.post(`http://localhost:3002/insertData/${userCode}`, newData);
      const responseData = response.data; 

      alert(`Новая запись: ${JSON.stringify(responseData.newData)}`);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };  

  return (
    <div className='ReplenishmentCont'>
      <label htmlFor="cardNumber">Номер карты:</label>
      <select id="cardNumber" value={cardNumber} onChange={handleCardNumberChange}>
        {userAccounts.map(account => (
          <option key={account} value={account}>{account}</option>
        ))}
      </select>

      <label htmlFor="operationType">Тип операции:</label>
      <select id="operationType" value={operationType} onChange={handleOperationTypeChange}>
        <option value="оплата">Оплата</option>
        <option value="пополнение">Пополнение</option>
      </select>
      <label htmlFor="Oname">Наименование:</label>
      <input type="text" id="Oname" value={Oname} onChange={handleONameChange} />

      <label htmlFor="amount">Сумма:</label>
      <input type="text" id="amount" value={amount} onChange={handleAmountChange} />

      <label htmlFor="accountNumber">Номер счета:</label>
      <input type="text" id="accountNumber" value={accountNumber} onChange={handleAccountNumberChange} />

      <button onClick={handleConfirm}>Готово</button>
    </div>
  );
};

export default Payments;