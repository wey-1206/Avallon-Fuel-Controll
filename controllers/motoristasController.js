const { Motorista } = require('../models');

const motoristaController = {
    async index(req, res) {
        try {
            const motoristas = await Motorista.findAll();
            return res.status(200).json(motoristas);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar motoristas' });
        }
    },

    async store(req, res) {
        try {
            if (!req.body.nome) {
                return res.status(400).json({ error: 'Nome é obrigatório' });
            }
            const novoMotorista = await Motorista.create({ nome: req.body.nome });
            return res.status(201).json(novoMotorista);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao criar motorista' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const motorista = await Motorista.findByPk(id);

            if (!motorista) {
                return res.status(404).json({ error: 'Motorista não encontrado' });
            }

            await motorista.update({ nome: req.body.nome });
            return res.status(200).json(motorista);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar Motorista' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const motorista = await Motorista.findByPk(id);

            if (!motorista) {
                return res.status(404).json({ error: 'Motorista não encontrado' });
            }

            await motorista.update({ is_active: false });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao desativar Motorista' });
        }
    }
};

module.exports = motoristaController;
