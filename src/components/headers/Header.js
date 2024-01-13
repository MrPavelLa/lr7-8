import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Profile from './Profile'; 

const Header = ({ userCode, setCode }) => {
  const [selectedCategory, setSelectedCategory] = useState('Deposits');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [localCode, setLocalCode] = useState(''); 
  const categories = {
    Deposits: ['Мои вклады', 'Расчетные', 'Накопительные', 'Валютные'],
    Loans: ['Мои кредиты', 'Ипотечные', 'Потребительские', 'Автокредиты'],
    Transaction: ['История операций', 'Изменить', 'Операции', 'Отчет'],
  };
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:3001/users') 
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); 
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });
  }, []);

  const handleBarClick = (category) => {
    setSelectedCategory(category);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCodeChange = (newCode) => {
    setLocalCode(newCode); 
    setCode(newCode); 
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const authorizeUser = (code, password) => {
    const user = users.find((u) => u.code === code && u.password === password);
    setCurrentUser(user);
    closeProfile();
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };
  return (
    <>
      <div className='header_link'>
      <div className='Bank_Name_logo'>
        <img src="/BankLogo.png" alt="BankLogo" className="BankLogo" />
        <a className="BankName">ПРОГРЕСС БАНК</a>
      </div>

        <button className="Profile" onClick={openProfile}>
          {currentUser ? (
            <img src={currentUser.photo ? `/${currentUser.photo}` : '/NoProfile.jpg'} alt="Profile" className="ProfilePhoto" />

          ) : (
            <img src="/NoProfile.jpg" alt="NoProfile" className="NoProfile" />
          )}
        </button>
      </div>

      <div className="link-container">
      <button className='link' onClick={() => handleBarClick('Deposits')}>
        <Link to="/Deposits">Вклады</Link>
        {selectedCategory === 'Deposits' && <div className='ButBor'></div>}
      </button>
      <button className='link' onClick={() => handleBarClick('Loans')}>
        <Link to="/Loans">Кредиты</Link>
        {selectedCategory === 'Loans' && <div className='ButBor'></div>}
      </button>
      <button className='link' onClick={() => handleBarClick('Transaction')}>
        <Link to="/Transaction">Операции</Link>
        {selectedCategory === 'Transaction' && <div className='ButBor'></div>}
      </button>
    </div>

    <div className="button-container">
  {categories[selectedCategory].map((text, index) => (
    text === 'История операций' ? (
      <Link key={index} className="bar-but" to="/Transaction">
        {text}
      </Link>
    ) : text === 'Операции' ? (
      <Link key={index} className="bar-but" to="/Payments">
        {text}
      </Link>
    ) : text === 'Изменить' ? (
      <Link key={index} className="bar-but" to="/Replenishment">
        {text}
      </Link>
    ) : text === 'Отчет' ? (
      <Link key={index} className="bar-but" to="/Poluch">
        {text}
      </Link>
    ): (
      <a key={index} className="bar-but" href={`#${text}`}>
        {text}
      </a>
    )
  ))}
</div>

      {isProfileOpen && (
        <Profile
          currentUser={currentUser}
          authorizeUser={authorizeUser}
          logoutUser={logoutUser}
          closeProfile={closeProfile}
          onCodeChange={handleCodeChange}
        />
      )}
      <Outlet />
    </>
  );
};

export default Header;




