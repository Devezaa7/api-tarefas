const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

router.post('/tarefas', tarefaController.criar);
router.get('/tarefas', tarefaController.listar);
router.get('/tarefas/:id', tarefaController.buscarPorId);
router.put('/tarefas/:id', tarefaController.atualizar);
router.patch('/tarefas/:id/status', tarefaController.atualizarStatus);
router.delete('/tarefas/:id', tarefaController.deletar);

module.exports = router;