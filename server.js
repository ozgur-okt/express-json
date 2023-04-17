const express = require('express');
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Get all data
app.get('/data', (req, res) => {
  // Read the contents of data.json and send it as the response
  const data = require('./data.json');
  res.send(data);
});

// Get a specific item by ID
app.get('/data/:id', (req, res) => {
  const data = require('./data.json');
  const id = req.params.id;
  const item = data.find(item => item.id === id);

  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.send(item);
  }
});

// Create a new item
app.post('/data', (req, res) => {
  const data = require('./data.json');
  const newItem = req.body;
  data.push(newItem);
  // Save the updated data to data.json
  require('fs').writeFileSync('./data.json', JSON.stringify(data));
  res.send(newItem);
});

// Update an existing item by ID
app.put('/data/:id', (req, res) => {
  const data = require('./data.json');
  const id = req.params.id;
  const updatedItem = req.body;
  const index = data.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).send('Item not found');
  } else {
    data[index] = updatedItem;
    // Save the updated data to data.json
    require('fs').writeFileSync('./data.json', JSON.stringify(data));
    res.send(updatedItem);
  }
});

// Delete an item by ID
app.delete('/data/:id', (req, res) => {
  const data = require('./data.json');
  const id = req.params.id;
  const index = data.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).send('Item not found');
  } else {
    const deletedItem = data.splice(index, 1)[0];
    // Save the updated data to data.json
    require('fs').writeFileSync('./data.json', JSON.stringify(data));
    res.send(deletedItem);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
