import pg from 'pg';

const {Pool} = pg;

const pool = new Pool({
    user: 'productivity',
    host: 'localhost',
    database: 'productivity_web',
    password: 'great',
    port: 5432,
});

pool.connect()
.then(()=> console.log('connected to PostgreSQL'))
.catch((err) => console.error('Connection error', err.stack));

export default pool;