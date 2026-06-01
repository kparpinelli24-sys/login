require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('./public'));

const authRoutes = require('./src/routes/authRoutes');
const questoesRoutes = require('./src/routes/questoesRoutes');

const { verificarToken } = require('./src/middleware/authMiddleware');

app.use('/auth', authRoutes);

app.use(
    '/questoes',
    verificarToken,
    questoesRoutes
);

const questoesRoutes =
require('./src/routes/questoesRoutes');

app.use(
    '/questoes',
    verificarToken,
    questoesRoutes
);

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});
