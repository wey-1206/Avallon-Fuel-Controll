const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Combustivel = sequelize.define('Combustivel', {
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
  tableName: 'combustiveis',
  underscored: true,
  timestamps: true
});



async function initializeGasolinaData() {
  try {
    const count = await Combustivel.count();
    if (count === 0) {
      await Combustivel.bulkCreate([
        { nome: 'GASOLINA' },
        { nome: 'DIESEL' },
        { nome: 'ÁLCOOL' }
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
  initializeGasolinaData();
});



module.exports = Combustivel;
