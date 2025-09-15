const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const motoristasRoutes = require('./routes/motoristas');
const combustiveisRoutes = require('./routes/combustiveis');
const setoresRoutes = require('./routes/setores');
const fornecedoresRoutes = require('./routes/fornecedores');
const abastecimentoRoutes = require('./routes/abastecimento')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/motoristas', motoristasRoutes);
app.use('/setores', setoresRoutes);
app.use('/fornecedores', fornecedoresRoutes);
app.use('/combustiveis', combustiveisRoutes);
app.use('/abastecimento', abastecimentoRoutes);


app.get('/', (req, res) => {
  res.render('index'); // procura views/index.ejs
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});
