const bcrypt = require('bcrypt');
const User = require('./user.model');

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.userId = user._id;

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getCurrentUser = async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);

      if (user) {
        res.json({
          id: user._id,
          username: user.username,
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const logoutUser = async (req, res) => {
  try {

    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };


