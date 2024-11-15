const pool = require('../../db/dbconexão');

class ServicosDao {
    async salvar(servico) {
        const query = 'INSERT INTO servicos (servico, user_id) VALUES ($1, $2)';
        const values = [servico.servico, servico.user_id];
        
        try {
            await pool.query(query, values);
            console.log('Serviço salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    }
    
    async deletarOne(user_id) {
        const query = 'DELETE FROM servicos WHERE user_id= $1';
        const values = [user_id];
        
        try {
            await pool.query(query, values);
            console.log('Serviço deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    }
    
    async deletarAgendaOne(id) {
        const query = 'DELETE FROM servicos WHERE id= $1';
        const values = [id];
        
        try {
            await pool.query(query, values);
            console.log('Serviço deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    }
    
    async editar(servico) {
        const query = 'UPDATE servicos SET servico = $1, user_id = $2 WHERE id = $3';
        const values = [servico.servico, servico.user_id, servico.id];
        
        try {
            await pool.query(query, values);
            console.log('Serviço editado com sucesso!');
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    }
    
    async editarDisponibilidade(servico) {
        const query = `UPDATE servicos SET disponibilidade = $1 WHERE id = $2`;
        const values = [servico.disponibilidade, servico.id]
        
        try {
            await pool.query(query, values)
        } catch (error) {
            console.log("erro ao atualizar a disponibilidade da servico", error)
        }
    }
    
    async buscar(id) {
        const query = 'SELECT * FROM servicos WHERE user_id = $1';
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
        const query = 'SELECT * FROM servicos WHERE  user_id = $1';
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
        const query = 'SELECT * FROM servicos WHERE id = $1';
        const values = [id];
        
        try {
            const result = await pool.query(query, values);
            const servico = result.rows[0];
            return servico;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    }
    
    async buscarUser(user_id) {
        const query = 'SELECT * FROM servicos WHERE user_id = $1';
        const values = [user_id];
        
        try {
            const result = await pool.query(query, values);
            const servico = result.rows[0];
            return servico;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    }
    
    async buscarTodos() {
        const query = 'SELECT profissao FROM servicos';
        
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

module.exports = ServicosDao;
