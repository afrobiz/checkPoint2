import chai from 'chai';
import chaiHttp from 'chai-http';
// import testData from '../testData';

import app from '../../app';

const should = chai.should();

const admin = {
  fullName: 'Mayowa Makinde',
  email: 'mayowamakinde@gmail.com',
  password: 'andela',
  confirmPassword: 'andela',
  roleId: 1
};

const incompleteRole = {
  noTitle: ''
};
const roleOne = {
  title: 'observer',
};


chai.use(chaiHttp);

describe('Role', () => {
  let token;

  before((done) => {
    chai.request(app).post('/users').send(admin).end((err, res) => {
      res.should.have.status(201);
      token = res.body.jsonToken;
      done();
    });
  });

  describe('/POST roles', () => {
    it('should fail without title field', (done) => {
      chai.request(app)
        .post('/role')
        .send(incompleteRole)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string').eql('This field is required');
          done();
        });
    });

    it('should save role info', (done) => {
      chai.request(app)
        .post('/role')
        .send(roleOne)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('role');
          res.body.role.should.be.a('object');
          res.body.role.should.have.property('title');
          res.body.message.should.be.a('string').eql('Role created succesfully');
          done();
        });
    });

    it('should fail if title already exists', (done) => {
      chai.request(app)
        .post('/role')
        .send(roleOne)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Error creating new role');
          done();
        });
    });
  });

  describe('/VIEW role', () => {
    it('should get list of roles', (done) => {
      chai.request(app)
        .get('/roles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.eql(3);
          done();
        });
    });
  });

  describe('/UPDATE roles', () => {
    it('should update role', (done) => {
      chai.request(app)
        .put('/roles/3')
        .send({ title: 'superUser' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message').eql('Role updated successfully');
          res.body.role.title.should.eql('superUser');
          done();
        });
    });

    it('should fail if role does not exist', (done) => {
      chai.request(app)
        .put('/roles/45')
        .send({ title: 'ababio' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });

  describe('/GET role', () => {
    it('should get role', (done) => {
      chai.request(app)
      .get('/roles/3')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('should fail if role does not exist', (done) => {
      chai.request(app)
        .get('/roles/12')
        .send({ title: 'gbagaun' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });

  describe('/DELETE role', () => {
    it('should delete role', (done) => {
      chai.request(app)
      .delete('/roles/3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Role has been deleted successfully');
        done();
      });
    });

    it('should fail if role does not exist', (done) => {
      chai.request(app)
        .delete('/roles/12')
        .send({ title: 'gbagaun' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });
});