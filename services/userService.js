const fs = require('fs');
const usersFilePath = 'users.json';

function readUsers() {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data).users;
  }
  return [];
}

function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
}

module.exports = {
  readUsers,
  saveUsers,
};
