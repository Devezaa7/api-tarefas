const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarefa = sequelize.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'a fazer',
    validate: {
      isIn: [['a fazer', 'em andamento', 'concluída']]
    }
  }
}, {
  tableName: 'tarefas',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm'
});

module.exports = Tarefa;
