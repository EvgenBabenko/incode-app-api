const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const { MongoManager } = require('./mongo');

const taskRouter = require('./routes/taskRoute');
const AuthController = require('./controllers/Auth');

const mongo = new MongoManager(config);

const app = express();

mongo.connect()
  .then(() => { console.log('Successfully connected to the database'); })
  .catch((err) => {
    console.log(`Could not connect to the database. Exiting now...
    ${err}`);
    process.exit();
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/auth', AuthController);
app.use('/dashboard', taskRouter);

app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));
