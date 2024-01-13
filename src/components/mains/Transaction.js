import React, { useState, useEffect } from 'react';
import TransactionChart from './TransactionChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import axios from 'axios';

const Transaction = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('date');
  const [pageLink, setPageLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/datatransaction/${props.code}`);
        const data = await response.json();
        const userTransactions = data[props.code] || [];
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Ошибка при получении данных транзакций:', error);
      }
    };
  
    fetchData();
  }, [props.code]); 
   


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (type) => {
    setSortType(type);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/getFrontendPage');
        setPageLink(response.request.responseURL); 
      } catch (error) {
        console.error('Не удалось получить страницу:', error);
      }
    };

    fetchData();
  }, []);

  const sortTransactions = (type) => {
    switch (type) {
      case 'date':
        return transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'amount':
        return transactions.slice().sort((a, b) => b.amount - a.amount);
      case 'name':
        return transactions.slice().sort((a, b) => a.operationName.localeCompare(b.operationName));
      default:
        return transactions;
    }
  };

  if (!props.code || props.code.trim() === '') {
    return (   
      <div className='TransactCont'> 
        <p>У вас нет операций</p>;
      </div>
    )
  }

  const filteredTransactions = selectedCategory === 'all'
    ? sortTransactions(sortType)
    : sortTransactions(sortType).filter(transaction => transaction.category === selectedCategory);

  return (   
    <div className='TransactCont'>
      <div className='TransactionChart'>      
        <TransactionChart transactions={transactions} />
      </div>
      <div className='TransF'>
        <div className='TransBut'>
          <Button onClick={() => handleCategoryChange('all')}>Все</Button>
          <Button onClick={() => handleCategoryChange('пополнение')}>Пополнение</Button>
          <Button onClick={() => handleCategoryChange('оплата')}>Оплата</Button>
        </div>

        <FormControl>
          <InputLabel id="sort-label">Сортировка:</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sortType}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <MenuItem value="date">По дате&#x25BC;</MenuItem>
            <MenuItem value="amount">По сумме&#x25BC;</MenuItem>
            <MenuItem value="name">По наименованию операции&#x25BC;</MenuItem>
          </Select>
        </FormControl>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Наименование операции</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Время</TableCell>
                <TableCell>Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.operationName}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <a href={pageLink} target="_blank" rel="noopener noreferrer">Page</a>
      </div>
    </div>
  );
};

export default Transaction;

