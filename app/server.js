import Express from 'express';

const app = Express();
const port = 5000;

app.get('/books', (req, res) => {
  res.send('HEY');
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
