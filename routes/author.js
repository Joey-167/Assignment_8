const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// Create a new author
router.post('/', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all authors with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const authors = await Author.find()
      .populate('books')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(authors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    if (!author) return res.status(404).send();
    res.send(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an author by ID
router.patch('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!author) return res.status(404).send();
    res.send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an author by ID
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).send();
    res.send(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
// Search authors by name or bio
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const authors = await Author.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } }
      ]
    }).populate('books');
    res.send(authors);
  } catch (error) {
    res.status(500).send(error);
  }
});
