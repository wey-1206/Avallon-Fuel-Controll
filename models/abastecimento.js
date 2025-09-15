const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Abastecimento = sequelize.define('Abastecimento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    canhoto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    placaOS: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_abastecimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    motorista_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    setor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fornecedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    combustivel_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado_nf: {
        type: DataTypes.ENUM('ENTREGUE', 'PENDENTE', 'DIVERGENTE'),
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    obs: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'abastecimentos',
    underscored: true,
    timestamps: true
});



module.exports = Abastecimento;
