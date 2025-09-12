const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
      await Motorista.bulkCreate([
        { nome: 'Wesley' },
        { nome: 'Junior' },
        { nome: 'Leandro' }
      ]);
      console.log('insert OK.');
    } else {
      console.log('inserts já feitos');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

sequelize.sync().then(() => {
  initializeMotoristaData();
});



module.exports = Motorista;
