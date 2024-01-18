const User = require('./user.model');
const bcrypt = require('bcrypt');


//Registrerar user och sparar i db
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    }

    // If the username is not taken, proceed with registration
    const hashedPassword = await bcrypt.hash(password, 3);
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

  // Sätt session
  req.session.userId = user._id;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
    
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


async function logoutUser(req, res) {
  // Destroy the user's session or token on the server side
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
}

module.exports = { registerUser, loginUser, logoutUser };

