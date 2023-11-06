const pool = require('../../db/dbconexão');

class AgendaDao {
  async salvar(agenda) {
    const query = 'INSERT INTO agendas (data, horario, disponibilidade, profissao, user_id) VALUES ($1, $2, $3, $4, $5)';
    const values = [agenda.data, agenda.horario, agenda.disponibilidade, agenda.profissao, agenda.user_id,];

    try {
      await pool.query(query, values);
      console.log('Usuário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

 async deletarOne(user_id) {
    const query = 'DELETE FROM agendas WHERE user_id= $1';
    const values = [user_id];

    try {
      await pool.query(query, values);
      console.log('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    } 
  } 
  async deletarAgendaOne(id) {
    const query = 'DELETE FROM agendas WHERE id= $1';
    const values = [id];

    try {
      await pool.query(query, values);
      console.log('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    } 
  } 

  async editar(agenda) {
    const query = 'UPDATE agendas SET disponibilidade = $1, data = $2,  horario = $3 WHERE id = $4';
    const values = [agenda.disponibilidade, agenda.data, agenda.horario, agenda.id];

    try {
      await pool.query(query, values);
      console.log('Usuário editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }

  async editarDisponibilidade(agenda){
    const query = `UPDATE agendas SET disponibilidade = $1 WHERE id = $2`;
    const values = [agenda.disponibilidade, agenda.id]

    try {
      await pool.query(query, values)
    } catch (error) {
      console.log("erro ao atualizar a disponibilidade da agenda", error)
    }
  }

  async buscar(id) {
    const query = 'SELECT * FROM agendas WHERE profissao = $1';
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

  
  async buscarUserId(id) {
    const query = 'SELECT * FROM agendas WHERE  user_id = $1';
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
  async findById(id) {
    const query = 'SELECT * FROM agendas WHERE id = $1';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      const agenda = result.rows[0];
     return agenda;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }
  async buscarUser(user_id) {
    const query = 'SELECT * FROM agendas WHERE user_id = $1';
    const values = [user_id];

    try {
      const result = await pool.query(query, values);
      const agenda = result.rows[0];
     return agenda;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }
  async buscarTodos() {
    const query = 'SELECT profissao FROM agendas'; 

    try {
      const result = await pool.query(query);
      const usuarios = result.rows;
      return usuarios;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
}
}

module.exports = AgendaDao;
