const { Fornecedor } = require('../models');

const fornecedoresController = {
    async index(req, res) {
        try {
            const fornecedores = await Fornecedor.findAll();
            return res.status(200).json(fornecedores);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar fornecedores' });
        }
    },

    async store(req, res) {
        try {
            if (!req.body.nome) {
                return res.status(400).json({ error: 'Nome é obrigatório' });
            }
            const novoFornecedor = await Fornecedor.create({ nome: req.body.nome });
            return res.status(201).json(novoFornecedor);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao criar fornecedor' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const fornecedor = await Fornecedor.findByPk(id);

            if (!fornecedor) {
                return res.status(404).json({ error: 'Fornecedor não encontrado' });
            }

            await fornecedor.update({ nome: req.body.nome });
            return res.status(200).json(fornecedor);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const fornecedor = await Fornecedor.findByPk(id);

            if (!fornecedor) {
                return res.status(404).json({ error: 'Fornecedor não encontrado' });
            }

            await fornecedor.update({ is_active: false });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao desativar fornecedor' });
        }
    }
};

module.exports = fornecedoresController;
