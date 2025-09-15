const { sequelize } = require('../config/db');
const Motorista = require('./motorista');
const Setor = require('./setor');
const Fornecedor = require('./fornecedor');
const Combustivel = require('./combustivel');

// Define associations
Setor.hasMany(Motorista, { foreignKey: 'setor_id' });
Motorista.belongsTo(Setor, { foreignKey: 'setor_id' });

module.exports = {
  sequelize,
  Motorista,
  Setor,
  Fornecedor,
  Combustivel
};