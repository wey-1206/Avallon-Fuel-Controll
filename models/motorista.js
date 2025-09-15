const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Setor = require('./setor');

const Motorista = sequelize.define('Motorista', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  setor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'setor',
      key: 'id'
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'motoristas',
  underscored: true,
  timestamps: true
});

async function initializeMotoristaData() {
  try {
    const count = await Motorista.count();
    if (count === 0) {
      const setores = await Setor.findAll();
      if (setores.length === 0) {
        console.error('Erro: Nenhum setor encontrado para associar motoristas.');
        return;
      }
      await Motorista.bulkCreate([
        { nome: 'WESLEY', setor_id: setores[1].id },
        { nome: 'JUNIOR', setor_id: setores[1].id },
        { nome: 'LEANDRO', setor_id: setores[1].id }
      ]);
      console.log('Motorista insert OK.');
    } else {
      console.log('Motorista inserts já feitos');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

sequelize.sync().then(() => {
  initializeMotoristaData();
});

module.exports = Motorista;