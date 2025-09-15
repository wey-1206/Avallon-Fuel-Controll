const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Setor = sequelize.define('Setor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'setor',
  underscored: true,
  timestamps: true
});

async function initializeSetorData() {
  try {
    const count = await Setor.count();
    if (count === 0) {
      await Setor.bulkCreate([
        { nome: 'TESTE DE RODAGEM' },
        { nome: 'ASSISTÊNCIA' },
        { nome: 'CHECKLIST DE ENTRADA' }
      ]);
      console.log('Setor insert OK.');
    } else {
      console.log('Setor inserts já feitos');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

sequelize.sync().then(() => {
  initializeSetorData();
});

module.exports = Setor;