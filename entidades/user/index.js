const User = require('./user');
const UserDao = require('./userdao');

// Exemplo de uso

// Criando uma instância do UserDao
const userDao = new UserDao();

// Criando um novo usuário
const user = new User('Fulano de Tal', '12345678901', 'fulano@example.com', 'Desenvolvedor', '1234567890','nathanaaaa');

// Salvando o usuário no banco de dados
userDao.salvar(user);

// Deletando um usuário pelo CPF
//userDao.deletar('12345678901');

// Editando um usuário existente
const userEditado = new User('Fulano Editado', '12345678901', 'fulanoeditado@example.com', 'Designer', '9876543210','asdadaadadad');
userDao.editar(userEditado);

// Buscando um usuário pelo CPF
userDao.buscar('12345678901');
