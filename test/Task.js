process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const Task = require('../src/models/Task');
const server = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe('Task', () => {
  beforeEach((done) => { // Before each test we empty the database
    Task.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe('/GET task', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe('/POST task', () => {
    it('it should not POST a task without title', (done) => {
      const task = {
        description: 'two cases for each test'
      };
      chai.request(server)
        .post('/')
        .send(task)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Task title can not be empty');
          done();
        });
    });
    it('it should POST a task ', (done) => {
      const task = {
        title: 'Write test Mocha',
        description: 'two cases for each test'
      };
      chai.request(server)
        .post('/')
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql('Write test Mocha');
          res.body.should.have.property('description').eql('two cases for each test');
          done();
        });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id task', () => {
    it('it should GET a task by the given id', (done) => {
      const task = new Task({
        title: 'Write test Mocha',
        description: 'two cases for each test',
        status: 'To do'
      });
      task.save((err, data) => {
        chai.request(server)
          .get(`/${data.id}`)
          .send(data)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Write test Mocha');
            res.body.should.have.property('description').eql('two cases for each test');
            res.body.should.have.property('status').eql('To do');
            res.body.should.have.property('_id').eql(data.id);
            done();
          });
      });
    });
    it('it should not GET a task by the wrong id', (done) => {
      const task = new Task({
        title: 'Write test Mocha',
        description: 'two cases for each test',
        status: 'To do'
      });
      const id = 7;
      task.save((err, data) => {
        chai.request(server)
          .get(`/${data[id]}`)
          .send(data)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Task not found!');
            done();
          });
      });
    });
  });
  // /*
  //  * Test the /PUT/:id route
  //  */
  describe('/PUT/:id task', () => {
    it('it should UPDATE a task given the id', (done) => {
      const task = new Task({
        title: 'Write test Mocha'
      });
      task.save((err, data) => {
        chai.request(server)
          .put(`/${data.id}`)
          .send({
            title: 'Write test Mocha, and use Chai'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Write test Mocha, and use Chai');
            done();
          });
      });
    });
    it('it should not UPDATE a task given the id with empty data to update', (done) => {
      const task = new Task({
        title: 'Write test Mocha'
      });
      task.save((err, data) => {
        chai.request(server)
          .put(`/${data.id}`)
          .send({ })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Task content can not be empty');
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id task', () => {
    it('it should DELETE a task given the id', (done) => {
      const task = new Task({
        title: 'Write test Mocha',
        description: 'two cases for each test',
        status: 'To do'
      });
      task.save((err, data) => {
        chai.request(server)
          .delete(`/${data.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Task deleted successfully!');
            done();
          });
      });
    });
  });
});
