import React, { useState, useEffect } from 'react';
import Modal2 from './Modal2';
import axios from 'axios';

const Replenishment = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/datatransaction/${props.code}`);
        const data = await response.json();
        const userTransactions = data[props.code] || [];
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [props.code]);

  const handleDelete = async (index) => {
    try {
      const currentDate = new Date();
      const transactionTime = new Date(transactions[index].date + ' ' + transactions[index].time);
      const difference = (currentDate - transactionTime) / (1000 * 60); 
  
      if (difference <= 5) {
        await axios.delete(`http://localhost:3002/deleteTransaction/${props.code}/${index}`);
        const response = await fetch(`http://localhost:3002/datatransaction/${props.code}`);
        const data = await response.json();
        const userTransactions = data[props.code] || [];
        setTransactions(userTransactions);
      } else {
        alert('Время больше 5 минут. Удалить нельзя');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };  

  if (!props.code || props.code.trim() === '') {
    return (
      <div className='ReplenishmentCont'>
        <p>У вас нет операций</p>;
      </div>
    )
  }

  return (
    <div className='ReplenishmentCont'>
      <h1>Изменение платежей</h1>
      <table>
        <thead>
          <tr>
            <th>Наименование операции</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Сумма</th>
            <th>Изменение</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.operationName}</td>
              <td>{transaction.date}</td>
              <td>{transaction.time}</td>
              <td>{transaction.amount}</td>
              <td>
             
        <Modal2
          code={props.code}
          operationName={transaction.operationName}
          id={transaction.id}
          accounts={transaction.accounts}
          target={transaction.target}
          amount={transaction.amount}
        />
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Replenishment;

