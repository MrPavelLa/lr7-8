const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const filePath = path.join(__dirname, './datatransaction.json');

app.get('/datatransaction/:code', (req, res) => {
  const { code } = req.params;

  jsonfile.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Ошибка при чтении данных о транзакции:', err);
      res.status(500).send('Ошибка при чтении данных о транзакции');
    } else {
      const userTransactions = data[code] || [];
      const responseData = { [code]: userTransactions };

      res.json(responseData);
    }
  });
});

app.get('/getData/:code/:format', (req, res) => {
  const { code, format } = req.params;

  jsonfile.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Ошибка при чтении данных о транзакции:', err);
      res.status(500).json({ error: 'Ошибка при чтении данных о транзакции' });
    } else {
      const filteredData = data[code] || [];
      if (format === 'xml') {
        const xmlData = `<xml>${JSON.stringify(filteredData)}</xml>`;
        res.status(200).send(xmlData);
      } else if (format === 'html') {
        const htmlData = `<html><pre>${JSON.stringify(filteredData, null, 2)}</pre></html>`;
        res.status(200).send(htmlData);
      } else {
        res.status(200).json(filteredData);
      }
    }
  });
});

app.put('/updateTransaction/:code/:id', (req, res) => {
  const { code, id } = req.params;
  const { target, amount } = req.body;

  jsonfile.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Ошибка при чтении данных о транзакции:', err);
      res.status(500).json({ error: 'Ошибка при чтении данных о транзакции' });
    } else {
      const userTransactions = data[code] || [];
      const transactionIndex = userTransactions.findIndex((transaction) => transaction.id === Number(id));

      if (transactionIndex === -1) {
        res.status(404).json({ error: 'Транзакция не найдена' });
      } else {
        userTransactions[transactionIndex].target = target;
        userTransactions[transactionIndex].amount = amount;

        jsonfile.writeFile(filePath, data, (err) => {
          if (err) {
            console.error('Ошибка при записи данных о транзакции:', err);
            res.status(500).json({ error: 'Ошибка при записи данных о транзакции' });
          } else {
            res.status(200).json({ message: 'Транзакция успешно обновлена', updatedTransaction: userTransactions[transactionIndex] });
          }
        });
      }
    }
  });
});

app.delete('/deleteTransaction/:code/:index', (req, res) => {
  const { code, index } = req.params;

  jsonfile.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Ошибка при чтении данных о транзакции:', err);
      res.status(500).json({ error: 'Ошибка при чтении данных о транзакции' });
    } else {
      if (!data[code]) {
        res.status(404).json({ error: 'Транзакции для этого кода не найдены' });
        return;
      }

      const transactions = data[code];

      if (index < 0 || index >= transactions.length) {
        res.status(404).json({ error: 'Индекс транзакции вне диапазона' });
        return;
      }

      transactions.splice(index, 1);

      jsonfile.writeFile(filePath, data, (err) => {
        if (err) {
          console.error('Ошибка при записи данных о транзакции:', err);
          res.status(500).json({ error: 'Ошибка при записи данных о транзакции' });
        } else {
          res.status(200).json({ message: 'Транзакция успешно удалена' });
        }
      });
    }
  });
});

app.post('/insertData/:code', (req, res) => {
  const { code } = req.params;
  const newData = req.body;

  jsonfile.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Ошибка при чтении данных о транзакции:', err);
      res.status(500).json({ error: 'Ошибка при чтении данных о транзакции' });
    } else {
      if (!data[code]) {
        data[code] = [];
      }

      data[code].push(newData);

      jsonfile.writeFile(filePath, data, (err) => {
        if (err) {
          console.error('Ошибка при записи данных о транзакции:', err);
          res.status(500).json({ error: 'Ошибка при записи данных о транзакции' });
        } else {
          res.status(200).json({ message: 'Данные успешно добавлены', newData });
        }
      });
    }
  });
});


app.get('/getFrontendPage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontendPage.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});