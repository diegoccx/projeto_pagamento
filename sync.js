const sequelize = require('./models/connection');
const Payment = require('./models/Payment');
const Log = require('./models/Log');

if (process.env.DB_SYNC === 'true') {
  sequelize.sync({ alter: true }) // ou { force: true } para recriar as tabelas
    .then(() => console.log(`Banco de dados sincronizado com ${process.env.DB_DIALECT}!`))
    .catch(err => console.error('Erro ao sincronizar tabelas:', err));
}
