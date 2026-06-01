const QuestoesModel =
require('../models/questoesModel');

async function listarTodos(req, res) {

    try {

        const questoes =
        await QuestoesModel.listarTodos();

        res.status(200).json(questoes);

    } catch (erro) {

        res.status(500).json({
            mensagem:
            'Erro ao listar questões',
            erro: erro.message
        });

    }
}

async function buscarPorId(req, res) {

    try {

        const id =
        parseInt(req.params.id);

        const questao =
        await QuestoesModel.buscarPorId(id);

        if (!questao) {

            return res.status(404).json({
                mensagem:
                'Questão não encontrada'
            });

        }

        res.status(200).json(questao);

    } catch (erro) {

        res.status(500).json({
            mensagem:
            'Erro ao buscar questão',
            erro: erro.message
        });

    }
}

async function criar(req, res) {

    try {

        const {
            pergunta,
            tema,
            link,
            id_categoria,
            id_vestibular
        } = req.body;

        if (
            !pergunta ||
            !tema ||
            !id_categoria ||
            !id_vestibular
        ) {

            return res.status(400).json({
                mensagem:
                'Preencha todos os campos obrigatórios'
            });

        }

        const novaQuestao =
        await QuestoesModel.criar({
            pergunta,
            tema,
            link,
            id_categoria,
            id_vestibular
        });

        res.status(201).json(
            novaQuestao
        );

    } catch (erro) {

        res.status(500).json({
            mensagem:
            'Erro ao criar questão',
            erro: erro.message
        });

    }
}

async function atualizar(req, res) {

    try {

        const id =
        parseInt(req.params.id);

        const questaoAtualizada =
        await QuestoesModel.atualizar(
            id,
            req.body
        );

        if (!questaoAtualizada) {

            return res.status(404).json({
                mensagem:
                'Questão não encontrada'
            });

        }

        res.status(200).json(
            questaoAtualizada
        );

    } catch (erro) {

        res.status(500).json({
            mensagem:
            'Erro ao atualizar questão',
            erro: erro.message
        });

    }
}

async function deletar(req, res) {

    try {

        const id =
        parseInt(req.params.id);

        const deletado =
        await QuestoesModel.deletar(id);

        if (!deletado) {

            return res.status(404).json({
                mensagem:
                'Questão não encontrada'
            });

        }

        res.status(200).json({
            mensagem:
            'Questão removida com sucesso'
        });

    } catch (erro) {

        res.status(500).json({
            mensagem:
            'Erro ao excluir questão',
            erro: erro.message
        });

    }
}

async function buscarPorTema(req, res) {

    try {

        const { tema } = req.params;

        const questoes =
        await QuestoesModel.buscarPorTema(
            tema
        );

        res.status(200).json(
            questoes
        );

    } catch (erro) {

        res.status(500).json({
            mensagem:
            'Erro ao buscar tema',
            erro: erro.message
        });

    }
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorTema
};