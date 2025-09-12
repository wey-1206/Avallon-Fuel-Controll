const { sequelize } = require('../config/db');
const Motorista = require('./motorista');
const Setor = require('./setor');
const Fornecedor = require('./fornecedor');
const Combustivel = require('./combustivel');

module.exports = {
  sequelize,
  Motorista,
  Setor,
  Fornecedor,
  Combustivel
};
