const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

const app = express();

const taskRouter = require('./routes/taskRoute');

// mongoose.connect('mongodb://localhost:3001/mongoose-test')
mongoose.connect(mongoUrl)
  .then(() => {console.log("Successfully connected to the database")})
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", taskRouter);

app.listen(3001, () => console.log('Example app listening on port 3001!'))
