const pool = require('../config/database');

async function listarTodos() {

    const result = await pool.query(`
        SELECT *
        FROM questoes
        ORDER BY id_questao
    `);

    return result.rows;
}

async function buscarPorId(id) {

    const result = await pool.query(
        `
        SELECT *
        FROM questoes
        WHERE id_questao = $1
        `,
        [id]
    );

    return result.rows[0];
}

async function criar(dados) {

    const {
        pergunta,
        tema,
        link,
        id_categoria,
        id_vestibular
    } = dados;

    const result = await pool.query(
        `
        INSERT INTO questoes
        (
            pergunta,
            tema,
            link,
            id_categoria,
            id_vestibular
        )
        VALUES
        ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            pergunta,
            tema,
            link,
            id_categoria,
            id_vestibular
        ]
    );

    return result.rows[0];
}

async function atualizar(id, dados) {

    const {
        pergunta,
        tema,
        link,
        id_categoria,
        id_vestibular
    } = dados;

    const result = await pool.query(
        `
        UPDATE questoes
        SET
            pergunta = $1,
            tema = $2,
            link = $3,
            id_categoria = $4,
            id_vestibular = $5
        WHERE id_questao = $6
        RETURNING *
        `,
        [
            pergunta,
            tema,
            link,
            id_categoria,
            id_vestibular,
            id
        ]
    );

    return result.rows[0] || null;
}

async function deletar(id) {

    const result = await pool.query(
        `
        DELETE FROM questoes
        WHERE id_questao = $1
        `,
        [id]
    );

    return result.rowCount > 0;
}

async function buscarPorTema(tema) {

    const result = await pool.query(
        `
        SELECT *
        FROM questoes
        WHERE tema ILIKE $1
        `,
        [`%${tema}%`]
    );

    return result.rows;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorTema
};