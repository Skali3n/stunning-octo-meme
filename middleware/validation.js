function validateUserData(req, res, next) {
    const { email, password } = req.body;
    if (!email || !email.includes('@') || !password || password.length < 8) {
      return res.status(400).json({ error: 'Incorrect data' });
    }
    next();
  }
  
  module.exports = {
    validateUserData,
  };
  