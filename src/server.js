const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const tarefasRoutes = require('./routes/tarefas');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/', tarefasRoutes);

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Tarefas',
    versao: '1.0.0'
  });
});

async function iniciar() {
  try {
    await sequelize.sync();
    console.log('Banco de dados conectado');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro);
  }
}

iniciar();