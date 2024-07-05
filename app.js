const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book');
const authorRoutes = require('./routes/author');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookauthor', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
