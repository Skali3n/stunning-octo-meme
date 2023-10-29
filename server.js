const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userController = require('./controllers/userController');
const authGuard = require('./middleware/authGuard');

const PORT = 6000;

app.use(bodyParser.json());
app.use('/users', userController);
app.get('/users/me', authGuard, (req, res) => {
  res.status(200).json({ message: `Hello, ${user.firstName} ${user.lastName}`});
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});