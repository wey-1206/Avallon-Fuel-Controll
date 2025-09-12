const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fornecedor = sequelize.define('Fornecedor', {
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
  tableName: 'fornecedores',
  underscored: true,
  timestamps: true
});



async function initializeFornecedorData() {
  try {
    const count = await Fornecedor.count();
    if (count === 0) {
      await Fornecedor.bulkCreate([
        { nome: 'POSTO TRIANGULO' },
        { nome: 'POSTO BARUERI' },
        { nome: 'POSTO LEONARDO' }
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
  initializeFornecedorData();
});



module.exports = Fornecedor;
