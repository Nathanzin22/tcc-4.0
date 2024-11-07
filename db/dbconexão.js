const { Pool } = require('pg');

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tcc_nathan',
  password: 'postgres',
  port: 5432, // porta padrão do PostgreSQL
});

 
module.exports = pool;






































