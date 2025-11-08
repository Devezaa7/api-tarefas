const Tarefa = require('../models/tarefa');

exports.criar = async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;
    
    if(!titulo || titulo.trim() === '') {
      return res.status(400).json({ 
        erro: 'Titulo é obrigatório' 
      });
    }

    const novaTarefa = await Tarefa.create({
      titulo,
      descricao,
      status: status || 'a fazer'
    });

    return res.status(201).json(novaTarefa);
    
  } catch (error) {
    console.log('Erro ao criar tarefa:', error);
    return res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
};

exports.listar = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll({
      order: [['criadoEm', 'DESC']]
    });
    
    res.json(tarefas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await Tarefa.findByPk(id);
    
    if(!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
    
    const tarefa = await Tarefa.findByPk(id);
    
    if(!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    if(!titulo || titulo.trim() === '') {
      return res.status(400).json({ erro: 'Titulo não pode ser vazio' });
    }

    tarefa.titulo = titulo;
    tarefa.descricao = descricao;
    if(status) tarefa.status = status;
    
    await tarefa.save();
    
    res.json({
      mensagem: 'Tarefa atualizada com sucesso',
      tarefa: tarefa
    });
  } catch (error) {
    console.log('erro no update:', error);
    res.status(500).json({ erro: 'Erro ao atualizar' });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const tarefa = await Tarefa.findByPk(id);
    
    if(!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    if(!status) {
      return res.status(400).json({ erro: 'Status é obrigatório' });
    }

    const statusValidos = ['a fazer', 'em andamento', 'concluída'];
    if(!statusValidos.includes(status)) {
      return res.status(400).json({ 
        erro: 'Status inválido. Use: a fazer, em andamento ou concluída' 
      });
    }

    tarefa.status = status;
    await tarefa.save();
    
    res.json({
      mensagem: 'Status atualizado com sucesso',
      tarefa: tarefa
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await Tarefa.findByPk(id);
    
    if(!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    
    await tarefa.destroy();
    
    res.json({ 
      mensagem: 'Tarefa deletada com sucesso' 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: 'Erro ao deletar tarefa' });
  }
};