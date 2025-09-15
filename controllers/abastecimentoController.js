const { Abastecimento, Motorista, Setor, Fornecedor, Combustivel } = require('../models');

const abastecimentoController = {
    
  async index(req, res) {
    try {
      const abastecimentos = await Abastecimento.findAll({
        include: [
          { model: Motorista },
          { model: Setor },
          { model: Fornecedor },
          { model: Combustivel }
        ],
        order: [['data_abastecimento', 'DESC']]
      });
      
      return res.status(200).json(abastecimentos);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar abastecimentos' });
    }
  },

  async store(req, res) {
    try {
      const {
        canhoto,
        placaOS,
        data_abastecimento,
        valor,
        motorista_id,
        setor_id,
        fornecedor_id,
        combustivel_id,
        obs
      } = req.body;

      if (!canhoto || !placaOS || !data_abastecimento || !valor || !motorista_id || !setor_id || !fornecedor_id || !combustivel_id) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
      }

      const novoAbastecimento = await Abastecimento.create({
        canhoto,
        placaOS,
        data_abastecimento,
        valor,
        motorista_id,
        setor_id,
        fornecedor_id,
        combustivel_id,
        obs
      });

      return res.status(201).json(novoAbastecimento);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar Abastecimento' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const abastecimento = await Abastecimento.findByPk(id);

      if (!abastecimento) {
        return res.status(404).json({ error: 'Abastecimento não encontrado' });
      }

      await abastecimento.update(req.body);
      return res.status(200).json(abastecimento);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar Abastecimento' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const abastecimento = await Abastecimento.findByPk(id);

      if (!abastecimento) {
        return res.status(404).json({ error: 'Abastecimento não encontrado' });
      }

      await abastecimento.update({ is_active: false });
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao desativar Abastecimento' });
    }
  }
};

module.exports = abastecimentoController;
