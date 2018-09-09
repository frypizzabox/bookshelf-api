import express from 'express';
import Book from '../models/Book';

const router = express.Router();

const getBooks = async (req, res) => {
  try {
    return Book.find()
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getBook = async (req, res) => {
  try {
    return Book.findOne({
      _id: req.params.id
    })
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createBook = async (req, res) => {
  try {
    return new Book({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn
    })
      .save()
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateBook = async (req, res) => {
  try {
    return Book.findOne({
      _id: req.params.id
    })
      .then(book => {
        const newBook = {
          title: req.body.title ? req.body.title : book.title,
          author: req.body.author ? req.body.author : book.author,
          isbn: req.body.isbn ? req.body.isbn : book.isbn
        };
        book.save(newBook)
          .then(data => res.status(200).json(data))
          .catch(e => res.status(500).json(e));
      });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteBook = async (req, res) => {
  try {
    return Book.deleteOne({
      _id: req.params.id
    })
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
