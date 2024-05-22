const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const dataFilePath = path.join(__dirname, 'data', 'boats.json');

app.post('/save', (req, res) => {
  const newData = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, content) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(content);
    } catch (e) {
      console.error(e);
    }

    jsonData.push(newData);

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      res.status(200).send('Data saved');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
