import React, { useState } from 'react';

const Profile = ({ currentUser, authorizeUser, logoutUser, closeProfile, onCodeChange}) => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthorize = () => {
    authorizeUser(code, password);
    setCode('');
    setPassword('');
    onCodeChange(code);
  };
  const handleLogout = () => {
    logoutUser();
    setCode('');    
    setPassword('');
    onCodeChange('');
  };

  return (
    <div className="profile-dropdown">
      {currentUser ? (
        <div className="user-info">          
          <p>{currentUser.firstName} {currentUser.lastName}</p>
          <p>{currentUser.code}</p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <div className="login-form">
          <p>Введите Ваш код:</p>
          <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
          <p>Введите Ваш пароль:</p>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAuthorize}>Войти</button>
        </div>
      )}
      <button onClick={closeProfile}>Close</button>
    </div>
  );
};

export default Profile;
