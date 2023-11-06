const AgendaDao = require('./agendadao');
const Agenda = require('./agenda');

// Criando uma instância do AgendaDao
const agendaDao = new AgendaDao();

// Criando um novo usuário
const agenda = new Agenda('2020/04/05', '02:00', 0);
console.log(agenda)
// Salvando o usuário no banco de dados
agendaDao.salvar(agenda);

 