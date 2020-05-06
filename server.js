const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
// app.use('/api/content', require('./routes/api/content'));
app.use('/api/auth', require('./routes/api/auth'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('NODE_ENV = production');
  // Set static folder
  app.use(express.static('client/build'));
  //  get the index html path
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
