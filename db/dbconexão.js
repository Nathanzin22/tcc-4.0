const { Pool } = require('pg');

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: 'nathanzin',
  host: 'dpg-cs8h8p88fa8c73btt5hg-a',
  database: 'tcc_nathan',
  password: 'xU9uGN6CQCyeBLXDGA2VWvAbkp2SPnaC',
  port: 5432, // porta padrão do PostgreSQL
});

 
module.exports = pool;






































