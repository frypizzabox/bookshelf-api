import express from 'express';
import books from '../controllers/books';

const router = express.Router();

router.use('/books', books);

export default router;
