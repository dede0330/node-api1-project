// BUILD YOUR SERVER HERE
const db = require('./users/model');
const express = require('express');

const server = express();
server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ message: 'hello world' });
})

server.get('/api/users', async (req, res) => {
  try {
    const users = await db.find();
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No users found...' });
    }
  } catch (error) {
    res.status(500).json({ message: 'The users information could not be retrieved' });
  }
})

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'The user information could not be retrieved' });
  }
})

server.post('/api/users', async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (name && bio) {
      const newUser = await db.insert({ name, bio });
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: 'Please provide name and bio for the user' })
    }
  } catch (error) {
    res.status(500).json({ message: 'There was an error while saving the user to the database' });
  }
})

server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await db.remove(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'The user could not be removed' });
  }
})

server.put('/api/users/:id', async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updatedUser = await db.update(req.params.id, req.body);
    if (!name || !bio) {
      res.status(400).json({ message: 'Please provide name and bio for the user' });
    } else if (!updatedUser) {
      res.status(404).json({ message: 'The user with the specified ID does not exist' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'The user information could not be modified' });
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}