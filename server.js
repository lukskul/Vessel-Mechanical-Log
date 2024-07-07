const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public'))); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const dataFilePath = path.join(__dirname, 'data', 'vessels.json');

//look for language js files here
app.use(express.static(path.join(__dirname, 'language')));

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
  const requestBody = req.body;
  const vesselName = requestBody['vessel-name'].trim(); // Assuming the key is 'vessel-name'

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      const vessels = [{
        'vessel-name': vesselName,
        stats: {
          unitSystem: "standard"
        },
        engines: {}, 
        generators: {}, 
        electricMotors: {}, 
        shafts: {}, 
        props: {}, 
        thrusters: {},
        rudders: {},  
        grates: {}, 
        zincs: {}, 
        doors: {}, 
        misc: {} 
      }];
      return saveVesselName(vessels, res);
    }

    let vessels = JSON.parse(data);
    const vesselExists = vessels.some((vessel) => vessel['vessel-name']?.toLowerCase() === vesselName.toLowerCase());

    if (!vesselExists) {
      vessels.push({
        'vessel-name': vesselName,
        stats:{
          unitSystem: "standard"
        }, 
        engines: {}, 
        generators: {}, 
        electricMotors: {}, 
        shafts: {}, 
        props: {}, 
        thrusters: {},
        rudders: {},  
        grates: {}, 
        zincs: {}, 
        doors: {}, 
        misc: {} 
      });
      saveVesselName(vessels, res);
    } else {
      res.send('Vessel already exists');
    }
  });
});

// Function to get next available number for a task type
const getNextNumber = (vessel, task) => {
  let maxNumber = 0;
  if (vessel[task]) {
    const keys = Object.keys(vessel[task]);
    keys.forEach(key => {
      const match = key.match(/-(\d+)$/);
      if (match && parseInt(match[1]) > maxNumber) {
        maxNumber = parseInt(match[1]);
      }
    });
  }
  return maxNumber + 1;
};

app.post('/update', async (req, res) => {
  try {
      const { "vessel-name": vesselName, ...taskData } = req.body;

      if (!vesselName || !taskData) {
          return res.status(400).json({ error: 'Vessel name and task data are required' });
      }

      const taskType = Object.keys(taskData)[0]; // Extract taskType from taskData
      const additionalData = taskData[taskType]; // Extract additionalData for the taskType

      const data = await readData();

      const vesselIndex = data.findIndex(vessel => vessel['vessel-name'] === vesselName);

      if (vesselIndex === -1) {
          console.error("Vessel not found:", vesselName); // Log vessel not found
          return res.status(404).json({ error: 'Vessel not found' });
      }

      if (typeof data[vesselIndex][taskType] !== 'object') {
          data[vesselIndex][taskType] = {};
      }

    const nextNumber = getNextNumber(data[vesselIndex], taskType);

    // Update the taskType object with additional data
    Object.assign(data[vesselIndex][taskType], { [`${taskType}-Entry-${nextNumber}`]: additionalData })

      await writeData(data);
      res.json({
          message: 'Vessel data updated successfully',
          vessel: data[vesselIndex] // Ensure this includes the updated vessel data
      });
  } catch (error) {
      console.error('Error updating vessel data:', error);
      res.status(500).json({ error: 'Failed to update vessel data' });
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
            const vesselNamesAndUnits = vessels.map(vessel => ({
              name: vessel['vessel-name'],
              unitSystem: vessel.stats && vessel.stats.unitSystem ? vessel.stats.unitSystem : 'standard' // Default to 'standard'
          }));
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

app.get('/vessel-unit-system/:vesselName', (req, res) => {
  const vesselName = decodeURIComponent(req.params.vesselName);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Internal Server Error');
      }
      try {
          const vessels = JSON.parse(data);
          const vessel = vessels.find(v => v['vessel-name'] === vesselName);

          if (vessel && vessel.stats && vessel.stats.unitSystem) {
              res.json({ unitSystem: vessel.stats.unitSystem });
          } else {
              res.status(404).send('Vessel not found or unit system not specified');
          }
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).send('Internal Server Error');
      }
  });
});

app.get('/tasks/:vesselName', (req, res) => {
  const vesselName = req.params.vesselName;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading tasks file:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      try {
          const tasks = JSON.parse(data);
          const vesselTasks = tasks.find(task => task['vessel-name'] === vesselName);

          if (!vesselTasks) {
              return res.status(404).json({ error: 'Vessel not found' });
          }
          res.json(vesselTasks);
          
      } catch (parseErr) {
          console.error('Error parsing tasks data:', parseErr);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
