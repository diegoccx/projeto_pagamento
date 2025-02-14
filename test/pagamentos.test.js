const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
require('dotenv').config();

describe('Testes de API de Pagamentos', function () {
  this.timeout(10000);

  const clienteExistente = 'cus_000006510903';
  const clienteInexistente = 'cus_999999999999';

  it('Deve criar um pagamento por boleto com sucesso', async () => {
    const resposta = await request(app)
      .post('/api/pagamento/boleto')
      .send({
        valor: 100.50,
        descricao: 'Teste de boleto',
        cliente: clienteExistente
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('mensagem', 'Pagamento Boleto gerado com sucesso.');
    expect(resposta.body).to.have.property('boletoUrl');
  });

  it('Deve falhar ao criar boleto sem valor', async () => {
    const resposta = await request(app)
      .post('/api/pagamento/boleto')
      .send({ descricao: 'Teste', cliente: clienteExistente });

    expect(resposta.status).to.equal(422);
    expect(resposta.body).to.have.property('erros');
    expect(resposta.body.erros[0].msg).to.equal('Valor é obrigatório');
  });

  it('Deve falhar ao criar boleto com cliente inexistente', async () => {
    const resposta = await request(app)
      .post('/api/pagamento/boleto')
      .send({ valor: 50, descricao: 'Teste erro', cliente: clienteInexistente });

    expect(resposta.status).to.equal(400);
    expect(resposta.body).to.have.property('erro');
  });

  it('Deve criar um pagamento por cartão com sucesso', async () => {
    const resposta = await request(app)
      .post('/api/pagamento/cartao')
      .send({
        valor: 150.75,
        descricao: 'Teste de cartão',
        cliente: clienteExistente,
        creditCard: {
          numero: '4111111111111111',
          nome: 'Cliente Teste',
          validade: '12/26',
          codigoSeguranca: '123'
        },
        creditCardHolderInfo: { cpfCnpj: '12345678900' }
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('mensagem', 'Pagamento com cartão aprovado.');
  });

  it('Deve falhar ao criar um pagamento por cartão sem número do cartão', async () => {
    const resposta = await request(app)
      .post('/api/pagamento/cartao')
      .send({
        valor: 150.75,
        descricao: 'Teste de erro',
        cliente: clienteExistente,
        creditCard: {
          nome: 'Cliente Teste',
          validade: '12/26',
          codigoSeguranca: '123'
        },
        creditCardHolderInfo: { cpfCnpj: '12345678900' }
      });

    expect(resposta.status).to.equal(422);
    expect(resposta.body).to.have.property('erros');
    expect(resposta.body.erros[0].msg).to.equal('Número do cartão é obrigatório');
  });

  it('Deve criar um pagamento por PIX com sucesso', async () => {
    const resposta = await request(app)
      .post('/api/pagamento/pix')
      .send({
        valor: 200.00,
        descricao: 'Teste de PIX',
        cliente: clienteExistente
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('mensagem', 'Pagamento Com pix gerado com sucesso.');
  });

  it('Deve recuperar QR Code PIX', async () => {
    const pagamento = await request(app)
      .post('/api/pagamento/pix')
      .send({
        valor: 200.00,
        descricao: 'Teste de PIX',
        cliente: clienteExistente
      });

    const pagamentoId = pagamento.body.id;

    const resposta = await request(app)
      .get(`/api/pagamento/pix/${pagamentoId}/qrCode`);

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('qrCode');
  });

  it('Deve falhar ao recuperar QR Code PIX de pagamento inexistente', async () => {
    const resposta = await request(app)
      .get('/api/pagamento/pix/pagamentoInvalido/qrCode');

    expect(resposta.status).to.equal(404);
    expect(resposta.body).to.have.property('erro');
  });

});
