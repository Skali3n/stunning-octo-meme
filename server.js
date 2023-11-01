const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userController = require('./controllers/userController');
const authGuard = require('./middleware/authGuard');

const PORT = 6000;

const fs = require('fs');
const initializeData = () => {
  const roles = [
    {id: 1, title: 'isSuperAdmin'},
    {id: 2, title: 'member'},
  ];

  fs.writeFileSync('roles.json', JSON.stringify(roles), 'utf-8');

  const users = [
    {
      id: 1,
      firstName: 'Max',
      lastName: 'Zimovets',
      email: 'admin@gmail.com',
      password: 'Qwedsa123',
      roleId: 1,
    },
  ];
  fs.writeFileSync('users.json', JSON.stringify(users), 'utf-8');
};

initializeData();

app.use(bodyParser.json());
app.use('/users', userController);
app.get('/users/me', authGuard, (req, res) => {
  res.status(200).json({ message: `Hello, ${user.firstName} ${user.lastName}`});
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});