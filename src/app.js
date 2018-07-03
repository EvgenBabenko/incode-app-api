const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const { MongoManager } = require('./mongo');

const mongo = new MongoManager(config);

const app = express();

const taskRouter = require('./routes/taskRoute');

mongo.connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', taskRouter);

app.listen(3001, () => console.log('Example app listening on port 3001!'));
