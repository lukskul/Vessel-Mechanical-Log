const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const dataFilePath = path.join(__dirname, 'data', 'boats.json');

app.post('/save', (req, res) => {
  const { boatName } = req.body;
  const filePath = path.join(__dirname, 'data', 'boats.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Internal Server Error');
      }

      let boats = JSON.parse(data);
      const boatExists = boats.some(boat => boat.name.toLowerCase() === boatName.toLowerCase());

      if (!boatExists) {
          boats.push({ name: boatName });
          fs.writeFile(filePath, JSON.stringify(boats, null, 2), 'utf8', err => {
              if (err) {
                  console.error('Error writing file:', err);
                  return res.status(500).send('Internal Server Error');
              }
              res.send('Boat added successfully');
          });
      } else {
          res.send('Boat already exists');
      }
  });
});

app.get('/boats', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'boats.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Internal Server Error');
      }

      const boats = JSON.parse(data);
      res.json(boats);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
