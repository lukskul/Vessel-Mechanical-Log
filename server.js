const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public'))); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const dataFilePath = path.join(__dirname, 'data', 'vessels.json');

// Utility function to read the JSON file
const readData = () => {
  return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
          if (err) {
              return reject(err);
          }
          resolve(JSON.parse(data));
      });
  });
};

// Utility function to write to the JSON file
const writeData = (data) => {
  return new Promise((resolve, reject) => {
      fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
          if (err) {
              return reject(err);
          }
          resolve();
      });
  });
};

// Function to save New Vessel
const saveVesselName = (vessels, res) => {
  fs.writeFile(dataFilePath, JSON.stringify(vessels, null, 2), 'utf8', err => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Vessel name added successfully');
  });
};

app.post('/save', (req, res) => {
  const requestBody = req.body; // This will contain all the dynamic variables sent in the request

  // Extract the first key-value pair from the request body
  const key = Object.keys(requestBody)[0];
  const value = requestBody[key].trim(); // Trim whitespace

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      // If file doesn't exist or cannot be read, start with an empty array
      const vessels = [];
      vessels.push({ [key]: value });
      return saveVesselName(vessels, res);
    }

    let vessels = JSON.parse(data);
    const vesselExists = vessels.some((vessel) => vessel[key]?.toLowerCase() === value.toLowerCase());

    if (!vesselExists) {
      vessels.push({ [key]: value });
      saveVesselName(vessels, res);
    } else {
      res.send('Vessel already exists');
    }
  });
});

// Update vessel data endpoint
app.post('/update', async (req, res) => {
  try {
      const { "vessel-name": vesselName, unit, ...additionalData } = req.body; // Extract unit from request body
      if (!vesselName) {
          return res.status(400).send('Vessel name is required');
      }

      const data = await readData();
      const vesselIndex = data.findIndex(vessel => vessel['vessel-name'] === vesselName);

      if (vesselIndex === -1) {
          return res.status(404).send('Vessel not found');
      }

      // Set the unit type based on the selected value ("metric" or "standard")
      const unitType = unit === 'metric' ? 'metric' : unit === 'standard' ? 'standard' : undefined;

      if (unitType === undefined) {
          return res.status(400).send('Invalid unit type');
      }

      // Update the vessel data with the unit type and additional data
      data[vesselIndex] = {
          ...data[vesselIndex],
          unit: unitType,
          ...additionalData
      };

      await writeData(data);
      res.send('Vessel data updated successfully');
  } catch (error) {
      console.error('Error updating vessel data:', error);
      res.status(500).send('Failed to update vessel data');
  }
});

app.get('/vessel-names', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Internal Server Error');
      }
      try {
          const vessels = JSON.parse(data);
          // Ensure vessels is an array of objects with 'name' properties
          if (Array.isArray(vessels)) {
              res.json(vessels);
          } else {
              res.json([]);
          }
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).send('Internal Server Error');
      }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
