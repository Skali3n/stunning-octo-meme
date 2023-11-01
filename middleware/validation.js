function validateEmail(req, res, next) {
  const {email} = req.body;
  if (!email || email.split('@').length !==2) {
    return res.status(400).json({error: 'Wrong email format'});
  }
  next();
}

function validatePassword(req, res, next) {
  const {password} = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({error: 'Password must have 8 characters'});
  }
  next();
}

function validateUserData(req, res, next) {
  validateEmail(req, res, (error) => {
    if (error) {
      return error;
    }
    validatePassword(req, res, next);
  });
}
  
  module.exports = {
    validateEmail,
    validatePassword,
    validateUserData
  };
  