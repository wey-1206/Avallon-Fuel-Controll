const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const motoristasRoutes = require('./routes/motoristas');
// importar outras rotas: setores, fornecedores, combustiveis

const app = express();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
app.use('/motoristas', motoristasRoutes);
// app.use('/setores', setoresRoutes);
// app.use('/fornecedores', fornecedoresRoutes);
// app.use('/combustiveis', combustiveisRoutes);

// Sincronizar banco e iniciar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});
