import express from 'express';
import books from '../controllers/books';
import users from '../controllers/users';

const router = express.Router();

router.use('/books', books);
router.use('/users', users);

export default router;
