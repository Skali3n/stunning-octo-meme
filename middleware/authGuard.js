const jwt = require('jsonwebtoken');
const secretKey = 'HS256'; 

function authGuard(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Отсутствует токен' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Неверный токен' });
    }

    req.user = decoded; 
    next();
  });
}

module.exports = authGuard;
