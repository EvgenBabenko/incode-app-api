const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const mongo = require('./mongo');
const taskRouter = require('./routes/taskRoute');
const authRoute = require('./routes/authRoute');
const accessControlAllow = require('./utils/cors');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));
// CORS middleware
app.use(accessControlAllow);
app.use('/auth', authRoute);
app.use('/', taskRouter);

app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));
