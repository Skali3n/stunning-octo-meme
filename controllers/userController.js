const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validation = require('../middleware/validation');
const { readUsers, saveUsers } = require('../services/userService');
const fs = require('fs');

const secretKey = 'HS256';

const getUsers = () => {
  const data = fs.readFileSync('users.json', 'utf-8');
  return JSON.parse(data);
};

const createUser = (user) => {
  const users = getUsers();
  user.id = users.length + 1;
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users), 'utf-8');
  return user;
};

router.post('/register', validation.validateUserData, (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const users = readUsers();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

    bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Password hashing error' });
    }

    const user = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      email,
      password: hash,
      firstName,
      lastName,
    };

    users.push(user);
    saveUsers(users);

    res.status(201).json({ message: 'User successfully registered' });
  });
});

router.post('/login', validation.validateEmail, validation.validatePassword, (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const token = jwt.sign({ email: user.email }, 'HS256', { expiresIn: '1h' });

    res.status(200).json({id: user.id, email: user.email, token });
  });
});

module.exports = router;
