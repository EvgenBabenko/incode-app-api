const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const mongo = require('./mongo');
const accessControlAllow = require('./middlewares/cors');
const authRoute = require('./routes/authRoute');
const taskRouter = require('./routes/taskRoute');
const commentRoute = require('./routes/commentRoute');
const userRoute = require('./routes/userRoute');

// const routes = require('./routes');

const app = express();

mongo();

app.use(accessControlAllow);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use()

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/comment', commentRoute);
app.use('/', taskRouter);

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));

module.exports = app; // for testing
