const { sequelize } = require('../config/db');
const Motorista = require('./motorista');
const Setor = require('./setor');
const Fornecedor = require('./fornecedor');
const Combustivel = require('./combustivel');
const Abastecimento = require('./abastecimento');

// Associações
// Um Setor tem muitos Motoristas
Setor.hasMany(Motorista, { foreignKey: 'setor_id' });
Motorista.belongsTo(Setor, { foreignKey: 'setor_id' });

// Abastecimento pertence a cada entidade
Abastecimento.belongsTo(Motorista, { foreignKey: 'motorista_id' });
Motorista.hasMany(Abastecimento, { foreignKey: 'motorista_id' });

Abastecimento.belongsTo(Setor, { foreignKey: 'setor_id' });
Setor.hasMany(Abastecimento, { foreignKey: 'setor_id' });

Abastecimento.belongsTo(Fornecedor, { foreignKey: 'fornecedor_id' });
Fornecedor.hasMany(Abastecimento, { foreignKey: 'fornecedor_id' });

Abastecimento.belongsTo(Combustivel, { foreignKey: 'combustivel_id' });
Combustivel.hasMany(Abastecimento, { foreignKey: 'combustivel_id' });

module.exports = {
  sequelize,
  Motorista,
  Setor,
  Fornecedor,
  Combustivel,
  Abastecimento
};
