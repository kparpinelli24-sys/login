const express = require('express');

const router = express.Router();

const AuthController =
require('../controllers/authController');

router.post(
    '/login',
    AuthController.loginProfessor
);

module.exports = router;