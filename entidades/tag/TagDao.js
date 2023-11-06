const pool = require('../../db/dbconexão');

class TagDao {
  async salvar(tag) {
    const query = 'INSERT INTO tags (nome) VALUES ($1)';
    const values = [tag.nome];

    try {
      await pool.query(query, values);
      console.log('Usuário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

  async deletar(nome) {
    const query = 'DELETE FROM tags WHERE nome = $1';
    const values = [nome];

    try {
      await pool.query(query, values);
      console.log('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  async editar(tag) {
    const query = 'UPDATE tags SET nome = $1';
    const values = [tag.nome];

    try {
      await pool.query(query, values);
      console.log('Usuário editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }

  async buscar(nome) {
    const query = 'SELECT * FROM tags WHERE nome = $1';
    const values = [nome];

    try {
      const result = await pool.query(query, values);
      const tag = result.rows[0];
      console.log('Usuário encontrado:', tag);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }
}

module.exports = TagDao;
