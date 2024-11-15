const pool = require("../../db/dbconexão")


class fotoDao {
    async salvar(foto) {
        const query = 'INSERT INTO  foto (nome, user_id) VALUES ($1, $2)';
        const values = [foto.nome, foto.user_id];
        
        try {
            await pool.query(query, values);
            console.log('Usuário salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    }
    
    async deletar(nome) {
        const query = 'DELETE FROM foto WHERE user_id = $1';
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
        const query = 'SELECT * FROM foto WHERE user_id = $1';
        const values = [nome];
        
        try {
            const result = await pool.query(query, values);
            const tag = result.rows[0];
            return tag
            console.log('Usuário encontrado:');
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    }
    
    async buscarTodos() {
        const query = 'SELECT * FROM foto ';
        
        
        try {
            const result = await pool.query(query);
            const tag = result.rows;
            return tag
            console.log('Usuário encontrado:');
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    }
    
}

module.exports = fotoDao;