import express from 'express';
import Book from '../models/Book';

const router = express.Router();

const getBooks = async (req, res) => {
  try {
    return res.send('HEY');
  } catch (error) {
    return res.send(error);
  }
};

const createBook = async (req, res) => {
  try {
    const errors = [];

    if (!req.body.title) {
      errors.push('Required variable title is missing');
    }
    if (!req.body.author) {
      errors.push('Required variable author is missing');
    }
    if (!req.body.isbn) {
      errors.push('Required variable isbn is missing');
    }
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return new Book({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn
    })
      .save()
      .then(book => res.status(200).json(book));
  } catch (e) {
    return res.status(500).json({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      error: e.message
    });
  }
};

router.get('/', getBooks);
router.post('/', createBook);

export default router;
