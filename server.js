const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const asaasService = require('./asaasService');
const Payment = require('./models/Payment');
const Log = require('./models/Log'); 
require('./sync');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const salvarLogErro = async (mensagem) => {
  try {
    await Log.create({ message: mensagem, level: 'error' });
  } catch (erro) {
    console.error('Erro ao salvar log:', erro);
  }
};


app.post('/api/pagamento/boleto',
  [
    body('valor').exists().withMessage('Valor é obrigatório').isFloat({ gt: 0 }).withMessage('Valor deve ser maior que 0'),
    body('descricao').exists().withMessage('Descrição é obrigatória'),
    body('cliente').exists().withMessage('Cliente é obrigatório')
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(422).json({ erros: erros.array() });
    }
    try {
      const resultado = await asaasService.criarPagamentoBoleto(req.body);

    
      const pagamento = await Payment.create({
        id: resultado.id,
        valor: req.body.valor,
        descricao: req.body.descricao,
        cliente: req.body.cliente,
        tipo: 'boleto',
        status: 'pendente',
        boletoUrl: resultado.invoiceUrl || null
      });

        return res.status(200).json({
        mensagem: 'Pagamento Boleto gerado com sucesso.',
        pagamento,
        boletoUrl: resultado.invoiceUrl
      });
    } catch (erro) {
      await salvarLogErro(erro.message); // Salva o erro no banco
      return res.status(500).json({ mensagem: 'Erro ao processar boleto.', erro: erro.message });
    }
  }
);


app.post('/api/pagamento/cartao',
  [
    body('valor').exists().withMessage('Valor é obrigatório').isFloat({ gt: 0 }).withMessage('Valor deve ser maior que 0'),
    body('descricao').exists().withMessage('Descrição é obrigatória'),
    body('cliente').exists().withMessage('Cliente é obrigatório'),
    body('creditCard.numero').exists().withMessage('Número do cartão é obrigatório'),
    body('creditCard.nome').exists().withMessage('Nome do titular é obrigatório'),
    body('creditCard.validade').exists().withMessage('Validade é obrigatória')
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/).withMessage('Formato inválido MM/AA'),
    body('creditCard.codigoSeguranca').exists().withMessage('Código de segurança é obrigatório')
      .isLength({ min: 3, max: 4 }).withMessage('Código de segurança inválido'),
    body('creditCardHolderInfo.cpfCnpj').exists().withMessage('CPF/CNPJ é obrigatório')
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(422).json({ erros: erros.array() });
    }
    try {
      const resultado = await asaasService.criarPagamentoCartao(req.body);

      // Salva no banco de dados
      const pagamento = await Payment.create({
        id: resultado.id,
        valor: req.body.valor,
        descricao: req.body.descricao,
        cliente: req.body.cliente,
        tipo: 'cartao',
        status: 'pendente'
      });

      return res.status(200).json({ mensagem: 'Pagamento com cartão aprovado.', pagamento });
    } catch (erro) {
      await salvarLogErro(erro.message); // Salva o erro no banco
      return res.status(500).json({ mensagem: 'Erro ao processar pagamento com cartão.', erro: erro.message });
    }
  }
);


app.post('/api/pagamento/pix',
  [
    body('valor').exists().withMessage('Valor é obrigatório').isFloat({ gt: 0 }).withMessage('Valor deve ser maior que 0'),
    body('descricao').exists().withMessage('Descrição é obrigatória'),
    body('cliente').exists().withMessage('Cliente é obrigatório')
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(422).json({ erros: erros.array() });
    }
    try {
      const resultado = await asaasService.criarPagamentoPix(req.body);

      // Salva no banco de dados
      const pagamento = await Payment.create({
        id: resultado.id,
        valor: req.body.valor,
        descricao: req.body.descricao,
        cliente: req.body.cliente,
        tipo: 'pix',
        status: 'pendente',
        boletoUrl: resultado.invoiceUrl || null
      });

       return res.status(200).json({
        mensagem: 'Pagamento Com pix gerado com sucesso.',
        pagamento,
        boletoUrl: resultado.invoiceUrl
      });
    } catch (erro) {
      await salvarLogErro(erro.message); 
      return res.status(500).json({ mensagem: 'Erro ao processar PIX.', erro: erro.message });
    }
  }
);

app.use(express.static('public'));

const porta = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
}

module.exports = app;
