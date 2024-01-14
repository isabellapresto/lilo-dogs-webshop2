const mongoose = require('mongoose');
const { app } = require('./app');
const dotenv = require('dotenv').config();

async function main() {
  try {
    console.log('Connect to DB & start server');
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('Connected to the database');

    app.listen(process.env.PORT || 3001, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT || 3001}`)
  );
  
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

main().catch((err) => console.log(err));
