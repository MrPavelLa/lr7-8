import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import PastButton from './PastButton';

const Modal = ({ description, code, logoURL, comment }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Подать заявку
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div className='MadalPage'>
          <h1>{description}</h1>
          <p>Код: {code}</p>
          <img src={logoURL} alt="Logo" />
          <p> <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{comment}</span></p>
          <PastButton loanType={description} code={code} />
          <Button onClick={handleClose}>Закрыть</Button>
          
        </div>
      </Dialog>
    </div>
  );
};


export default Modal;
