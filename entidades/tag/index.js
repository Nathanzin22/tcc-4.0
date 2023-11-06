const TagDao = require('./TagDao');
const Tag = require('./tag');

// Criando uma instância do TagDao
const tagDao = new TagDao();

// Criando um novo usuário
const tag = new Tag(' asdaddddadaddadad');

// Salvando o usuário no banco de dados
tagDao.salvar(tag);

// Editando um usuário existente
const tagEditado = new Tag('nathandadad');
tagDao.editar(tagEditado);

// Buscando um usuário pelo CPF
tagDao.buscar('nathandadad');
