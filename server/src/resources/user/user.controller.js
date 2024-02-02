const bcrypt = require('bcrypt');
const User = require('./user.model');

// Registrera en ny användare
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    // Kolla om användarnamnet redan finns i databasen
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Användarnamnet finns redan. Vänligen välj ett annat användarnamn.' });
    }

    // Skapa en hash av lösenordet och spara 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Användaren registrerades framgångsrikt' });
  } catch (error) {
    console.error('Fel vid registrering av användare:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
}

// Logga in 
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // Om användaren inte finns - felmeddelande
    if (!user) {
      return res.status(401).json({ message: 'Ogiltigt användarnamn eller lösenord' });
    }

    // Jämför inkommande lösenord med den hashade versionen i databasen
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Om lösenordet inte är giltigt - felmeddelande
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Ogiltigt användarnamn eller lösenord' });
    }

    // Sätt användar-ID i sessionsdata
    req.session.userId = user._id;

    // Skicka tillbaka användarinformation
    res.json({
      message: 'Inloggning lyckades',
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Fel vid inloggning av användare:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
}

// Logga 
const logoutUser = async (req, res) => {
  try {
    // Ta bort sessionsdata
    req.session.destroy((err) => {
      if (err) {
        console.error('Fel vid förstörelse av session:', err);
        res.status(500).json({ message: 'Internt serverfel' });
      } else {
        // Ta bort cookies
        res.clearCookie('session');
        res.json({ message: 'Utloggning lyckades' });
      }
    });
  } catch (error) {
    console.error('Fel vid utloggning av användare:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
