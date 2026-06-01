const express =
require('express');

const router =
express.Router();

const QuestoesController =
require('../controllers/questoesController');

const {
    apenasProfessor
} = require(
    '../middleware/professorMiddleware'
);

router.get(
    '/',
    QuestoesController.listarTodos
);

router.get(
    '/buscar/id/:id',
    QuestoesController.buscarPorId
);

router.get(
    '/buscar/tema/:tema',
    QuestoesController.buscarPorTema
);

router.post(
    '/',
    apenasProfessor,
    QuestoesController.criar
);

router.put(
    '/:id',
    apenasProfessor,
    QuestoesController.atualizar
);

router.delete(
    '/:id',
    apenasProfessor,
    QuestoesController.deletar
);

module.exports = router;