import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';

// server constants
const port = process.env.PORT || 5000;
const dbUrl = 'mongodb://api:bookshelfRules2018@ds249992.mlab.com:49992/bookshelf';

// connect mongoose to database
mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// start express application
const app = express();

// parse application/x-www-form-urlencoded middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json middleware
app.use(bodyParser.json());

// apply routes to the application
app.use(routes);

// application listening to a port
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
