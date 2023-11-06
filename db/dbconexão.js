const { Pool } = require('pg');

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Na-1fusinato',
  port: 5432, // porta padrão do PostgreSQL
});

 
module.exports = pool;






































