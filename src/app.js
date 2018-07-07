const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const mongo = require('./mongo');
const accessControlAllow = require('./middlewares/cors');

const authRoute = require('./routes/authRoute');
const taskRouter = require('./routes/taskRoute');
const userRoute = require('./routes/userRoute');

// const routes = require('./routes');

// const validateRequest = require('./middlewares/validateRequest');

const app = express();

app.use(accessControlAllow); // CORS middleware
app.use(bodyParser.json()); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); // parse requests of content-type - application/json

// app.all('/api/v1/*', validateRequest);

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/', taskRouter);

// app.use('/', routes);


// // Auth Middleware - This will check if the token is valid
// // Only the requests that start with /api/v1/* will be checked for the token.
// // Any URL's that do not follow the below pattern should be avoided unless you 
// // are sure that authentication is not needed
// app.all('/api/v1/*', validateRequest);

// app.use('/', require('./routes'));

// // If no route is matched by now, it must be a 404
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));

module.exports = app; // for testing
