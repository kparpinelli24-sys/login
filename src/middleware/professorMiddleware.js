function apenasProfessor(
    req,
    res,
    next
) {

    if (
        req.user.tipo !==
        'professor'
    ) {

        return res.status(403).json({
            mensagem:
            'Acesso permitido apenas para professor'
        });
    }

    next();
}

module.exports = {
    apenasProfessor
};