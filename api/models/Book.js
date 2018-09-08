import moongose from 'mongoose';

const bookSchema = new moongose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default moongose.model('books', bookSchema);
