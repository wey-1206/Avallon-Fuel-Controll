const { Setor } = require('../models');

const setorController = {
    async index(req, res) {
        try {
            const setores = await Setor.findAll();
            return res.status(200).json(setores);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar setores' });
        }
    },

    async store(req, res) {
    try {
        if (!req.body.nome) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }
        const novoSetor = await Setor.create({ nome: req.body.nome });
        return res.status(201).json(novoSetor);
    } catch (err) {
        console.error(err); 
        return res.status(500).json({ 
            error: 'Erro ao criar Setor'
        });
    }
}
,

    async update(req, res) {
        try {
            const { id } = req.params;
            const setor = await Setor.findByPk(id);

            if (!setor) {
                return res.status(404).json({ error: 'Setor não encontrado' });
            }

            await setor.update({ nome: req.body.nome });
            return res.status(200).json(setor);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar Setor' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const setor = await Setor.findByPk(id);

            if (!setor) {
                return res.status(404).json({ error: 'Setor não encontrado' });
            }

            await setor.update({ is_active: false });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao desativar Setor' });
        }
    }
};

module.exports = setorController;
