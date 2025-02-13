const { DataTypes } = require('sequelize');
const sequelize = require('./connection'); // Importa a conexão configurada

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('boleto', 'cartao', 'pix'),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendente'
  },
  boletoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Payment;
