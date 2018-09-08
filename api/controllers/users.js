import express from 'express';
import User from '../models/User';
import Book from '../models/Book';

const router = express.Router();

const getUsers = async (req, res) => {
  try {
    return User.find()
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getUser = async (req, res) => {
  try {
    return User.findOne({
      _id: req.params.id
    })
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createUser = async (req, res) => {
  try {
    return new User({
      displayName: req.body.displayName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    })
      .save()
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateUser = async (req, res) => {
  try {
    return User.findOne({
      _id: req.params.id
    })
      .then(user => {
        const newUser = {
          displayName: req.body.displayName ? req.body.displayName : user.displayName,
          email: req.body.email ? req.body.email : user.email,
          phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber
        };
        user.save(newUser)
          .then(data => res.status(200).json(data))
          .catch(e => res.status(500).json(e));
      });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    return User.deleteOne({
      _id: req.params.id
    })
      .then(data => res.status(200).json(data))
      .catch(e => res.status(500).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};

const loanBook = async (req, res) => {
  try {
    return User.findOne({
      _id: req.params.id
    })
      .then(user => {
        Book.findOne({
          _id: req.body.bookId
        })
          .then(book => {
            user.loanedBooks.addToSet(book);
            user.save()
              .then(data => res.status(200).json(data))
              .catch(e => res.status(500).json(e));
          })
          .catch(e => res.status(500).json(e));
      });
  } catch (e) {
    return res.status(500).json(e);
  }
};


const returnBook = async (req, res) => {
  try {
    return User.findOne({
      _id: req.params.id
    })
      .then(user => {
        Book.findOne({
          _id: req.body.bookId
        })
          .then(book => {
            user.loanedBooks.pull(book);
            user.save()
              .then(data => res.status(200).json(data))
              .catch(e => res.status(500).json(e));
          })
          .catch(e => res.status(500).json(e));
      });
  } catch (e) {
    return res.status(500).json(e);
  }
};

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/loan', loanBook);
router.post('/:id/return', returnBook);

export default router;
