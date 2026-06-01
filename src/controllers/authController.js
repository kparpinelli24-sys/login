const jwt = require('jsonwebtoken');

async function loginProfessor(req, res) {

    const { email, senha } = req.body;

    if (
        email !== process.env.PROF_EMAIL ||
        senha !== process.env.PROF_SENHA
    ) {
        return res.status(401).json({
            mensagem: 'Email ou senha inválidos'
        });
    }

    const token = jwt.sign(
        {
            tipo: 'professor',
            email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '8h'
        }
    );

    res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        token
    });
}

module.exports = {
    loginProfessor
};