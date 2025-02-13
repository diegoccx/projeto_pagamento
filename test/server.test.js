const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('GET /', () => {
  it('deve retornar a página index.html', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /api/pagamento/boleto', () => {
  it('deve retornar 422 se os campos obrigatórios estiverem ausentes', (done) => {
    request(app)
      .post('/api/pagamento/boleto')
      .send({ valor: 100 })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('erros');
        done();
      });
  });
});

describe('POST /api/pagamento/cartao', () => {
  it('deve retornar 422 se os dados do cartão estiverem ausentes', (done) => {
    request(app)
      .post('/api/pagamento/cartao')
      .send({ valor: 100, descricao: 'Teste', cliente: 'Cliente' })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('erros');
        done();
      });
  });
});

describe('POST /api/pagamento/pix', () => {
  it('deve retornar 422 se os campos obrigatórios estiverem ausentes', (done) => {
    request(app)
      .post('/api/pagamento/pix')
      .send({ descricao: 'Teste', cliente: 'Cliente' })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('erros');
        done();
      });
  });
});
