import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 5000;
const dbUrl = 'mongodb://localhost/qliro';

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/books', (req, res) => {
  res.send('HEY');
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
