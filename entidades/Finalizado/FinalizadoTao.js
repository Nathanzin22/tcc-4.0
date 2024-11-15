const pool = require("../../db/dbconexão")


class finalizados {
    async salvar(salvar) {
        const query = 'INSERT INTO finalizado (nome, telefone, data, horario, user_id, datanow, obs) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        const values = [salvar.nome, salvar.telefone, salvar.data, salvar.horario, salvar.user_id, salvar.datanow, salvar.obs]
        
        try {
            await pool.query(query, values)
            console.log("tarefa salva com sucesso")
        } catch (error) {
            console.log("houve um erro ao gravas as tarefas", error)
        }
    }
    
    async findById(user_id) {
        const query = 'SELECT * FROM finalizado WHERE user_id = $1'
        const values = [user_id]
        try {
            var result = await pool.query(query, values);
            const registro = result.rows;
            console.log("dados reornados com exito ", registro)
            return registro;
            
        } catch (error) {
            console.log("erro ao buscar o registro", error)
        }
    }
    
    async findByDate(datanow) {
        const query = 'SELECT * FROM finalizado WHERE  datanow = $1';
        const values = [datanow]
        
        try {
            const result = await pool.query(query, values);
            const horas = result.rows;
            return horas
            console.log("dados reornados com exito ", horas)
            
        } catch (error) {
            console.log("Error no findbydata ", error)
        }
    }
    
    async deletarOne(user_id) {
        const query = 'DELETE FROM finalizado WHERE user_id= $1';
        const values = [user_id];
        
        try {
            await pool.query(query, values);
            console.log('Usuário deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    }
    
    async deleteOne(id) {
        const query = 'DELETE FROM finalizado WHERE id = $1';
        const values = [id]
        
        try {
            await pool.query(query, values);
            console.log("apagado com sucesso")
        } catch (error) {
            console.log("erro ao apagar o registro ", error)
        }
    }
    
}


module.exports = finalizados