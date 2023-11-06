const pool = require('../../db/dbconexão');

class UserDao {
  async salvar(usuario) {
    const query = 'INSERT INTO users (nome, cpf, email, profissao, telefone, senha) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [usuario.nome, usuario.cpf, usuario.email, usuario.profissao, usuario.telefone, usuario.senha];

    try {
      await pool.query(query, values);
      console.log('Usuário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

  async deletar(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];

    try {
      await pool.query(query, values);
      console.log('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  async editar(usuario, id) {
    const query = 'UPDATE users SET nome = $1, cpf = $2, email = $3, profissao = $4, telefone = $5  WHERE id = $6';
    const values = [usuario.nome, usuario.cpf, usuario.email, usuario.profissao, usuario.telefone, id];
  
    try {
      await pool.query(query, values);
      console.log('Usuário editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }

  async editarSenha(senhaNova, id) {
    const query = 'UPDATE users SET senha = $1 WHERE id = $2';
    const values = [senhaNova, id];
  
    try {
      await pool.query(query, values);
      console.log('Usuário editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }
  
  

  async buscar(email) {
    const query = 'SELECT * FROM users WHERE  email = $1';
    const values = [email];
  
    try {
      const result = await pool.query(query, values);
      const usuario = result.rows[0]; // Pega o primeiro usuário encontrado
      return usuario; // Retorna o usuário encontrado
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  } 
  async findById(id) {
    const query = 'SELECT * FROM users WHERE  id = $1';
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      const usuario = result.rows[0]; // Pega o primeiro usuário encontrado
      return usuario; // Retorna o usuário encontrado
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }
  async findByEmail(id) {
    const query = 'SELECT * FROM users WHERE  email = $1';
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      const usuario = result.rows[0]; // Pega o primeiro usuário encontrado
      return usuario; // Retorna o usuário encontrado
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }
  async findByProfissao(id) {
    const query = 'SELECT * FROM users WHERE  profissao = $1';
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      const usuario = result.rows; // Pega o primeiro usuário encontrado
      return usuario;
       // Retorna o usuário encontrado
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }
  async buscarTodos() {
    const query = 'SELECT nome, senha FROM users'; 

    try {
      const result = await pool.query(query);
      const usuarios = result.rows;
      return usuarios;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
}

async buscarTodosProfissao() {
  const query = 'SELECT profissao FROM users'; 

  try {
    const result = await pool.query(query);
    const usuarios = result.rows;
    return usuarios;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
}
  async authenticate(username, password) {
      const query = 'SELECT nome, senha FROM users WHERE nome = $1 AND senha = $2';
      const values = [username, password]; // Use o nome de usuário fornecido como valor
    
    try {
      const result = await pool.query(query, values);
      const user = result.rows[0]; // Pega o primeiro usuário encontrado
      if (user && user.nome && user.senha === password) {
        return user;
      } else {
        return null;
      }
    
  } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      throw error;
  }
}

}

module.exports = UserDao;
