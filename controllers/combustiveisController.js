const { Combustivel } = require('../models');

const combustiveisController = {
  async index(req, res) {
    try {
      const combustiveis = await Combustivel.findAll();
      return res.status(200).json(combustiveis);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar combustiveis' });
    }
  },

  async store(req, res) {
    try {
      if (!req.body.nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }
      const novoCombustivel = await Combustivel.create({ nome: req.body.nome });
      return res.status(201).json(novoCombustivel);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar combustível ' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const combustivel = await Combustivel.findByPk(id);

      if (!combustivel) {
        return res.status(404).json({ error: 'Combustível não encontrado' });
      }

      await combustivel.update({ nome: req.body.nome });
      return res.status(200).json(combustivel);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar Combustível' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const combustivel = await Combustivel.findByPk(id);

      if (!combustivel) {
        return res.status(404).json({ error: 'Combustível não encontrado' });
      }

        await combustivel.update({ is_active: false });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao desativar Combustível' });
    }
  }
};

module.exports = combustiveisController;
