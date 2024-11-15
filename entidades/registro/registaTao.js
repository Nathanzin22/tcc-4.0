const pool =require("../../db/dbconexão")

class RegistroTao{
    async salvar(registro){
        const query = 'INSERT INTO registro (nome,  telefone, data,  horario, user_id, obs) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [registro.nome, registro.telefone, registro.data, registro.horario, registro.user_id, registro.obs];

    try {
        await pool.query(query, values)
        console.log("registro salvo com sucesso")
    } catch (error) {
        console.log("erro ao salvar o  registro", error)
    }
    }

    async findById(user_id){
        const query = 'SELECT * FROM registro WHERE user_id = $1'
        const values = [user_id]
        try {
        var result = await pool.query(query, values);
        const registro = result.rows;
        console.log("dados reornados com exito ")
        return registro;
       
        } catch (error) {
            console.log("erro ao buscar o registro", error)
        }
    }

async deleteOne(id){
    const query = 'DELETE FROM registro WHERE id = $1';
    const values = [id]

    try {
        await pool.query(query, values);
        console.log("apagado com sucesso")
    } catch (error) {
        console.log("erro ao apagar o registro ", error)
    }
}
async deletarOne(user_id) {
    const query = 'DELETE FROM registro WHERE user_id= $1';
    const values = [user_id];

    try {
      await pool.query(query, values);
      console.log('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    } 
  } 
}


module.exports = RegistroTao;