const User = require('./user.model');

const authenticateUser = async (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);
      req.user = user; // Lägg till användaren i request-objektet
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
  }

  next();
};

module.exports = { authenticateUser };
