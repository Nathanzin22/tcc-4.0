const AgendaDao = require('../entidades/agenda/agendadao');
const UserDao = require('../entidades/user/userdao');

// Criando uma instância do UserDao e AgendaDao
const userDao = new UserDao();
const agendaDao = new AgendaDao();

// Função para executar o teste de integração
async function testIntegration() {
  try {
    // Criando um novo usuário
    const novoUsuario = {
      nome: 'Fulano',
      cpf: '12345678901',
      email: 'fulano@example.com',
      profissao: 'Programador',
      telefone: '123456789'
    };
    await userDao.salvar(novoUsuario);
    console.log('Usuário salvo com sucesso!');

    // Criando uma nova agenda para o usuário criado
    const novaAgenda = {
      data: '2023-06-15',
      horario: '14:00',
      disponibilidade: true,
      user_id: 1
    };
    await agendaDao.salvar(novaAgenda);
    console.log('Agenda salva com sucesso!');

    // Buscando o usuário pelo CPF
    const cpf = '12345678901';
    const usuarioEncontrado = await userDao.buscar(cpf);
    console.log('Usuário encontrado:', usuarioEncontrado);

    // Buscando a agenda pelo ID do usuário
    const userId = usuarioEncontrado.id;
    const agendaEncontrada = await agendaDao.buscar(userId);
    console.log('Agenda encontrada:', agendaEncontrada);

    // Editando o usuário
    const usuarioEditado = {
      nome: 'Fulano da Silva',
      email: 'fulano.silva@example.com',
      profissao: 'Engenheiro',
      telefone: '987654321'
    };
    await userDao.editar(usuarioEditado);
    console.log('Usuário editado com sucesso!');

    // Editando a agenda
    const agendaEditada = {
      data: '2023-06-16',
      horario: '15:00',
      disponibilidade: false,
      user_id: userId
    };
    await agendaDao.editar(agendaEditada);
    console.log('Agenda editada com sucesso!');

    // Deletando o usuário pelo CPF
    await userDao.deletar(cpf);
    console.log('Usuário deletado com sucesso!');
  } catch (error) {
    console.error('Erro no teste de integração:', error);
  }
}

// Executando o teste de integração
testIntegration();
