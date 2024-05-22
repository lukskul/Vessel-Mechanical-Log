const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = './data/boats.json';

// Read the data from the JSON file
const readData = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

// Write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Get all boat data
app.get('/boats', (req, res) => {
  const data = readData();
  res.json(data);
});

// Add a new boat
app.post('/boats', (req, res) => {
  const data = readData();
  const newBoat = req.body;
  data.push(newBoat);
  writeData(data);
  res.status(201).json(newBoat);
});

// Add work to a boat
app.post('/boats/:name/work', (req, res) => {
  const data = readData();
  const boatName = req.params.name;
  const workEntry = req.body;
  const boat = data.find(boat => boat.name === boatName);
  if (boat) {
    boat.work.push(workEntry);
    writeData(data);
    res.status(201).json(workEntry);
  } else {
    res.status(404).json({ error: 'Boat not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
