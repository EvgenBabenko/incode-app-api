const mongoose = require('mongoose');

const Task = require('./models/taskModel.js');

// mongoose.connect('mongodb://localhost:3001/mongoose-test')
mongoose.connect('mongodb://incode:incode2015@ds125211.mlab.com:25211/incode')
  .then(() => console.log('Connection established'))
  .catch(error => console.error(`An error occured: ${error}`));

const taskDoc = {
  title: 'first task'
}

const runQuery = async () => {
  try {
    const newQuery = await Task.create(taskDoc);

    console.log('create new: ', newQuery);

    return newQuery;

  } catch (error) {
    console.error(error)
  }
}

runQuery()
