const { Client } = require('pg');

// Database connection parameters
const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'student',
  password: '5432',
  port: 5432,
});

// Connect to PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database', err));

// Define a function to fetch data from the database based on the entered ID
const fetchDataById = async (id) => {
  try {
    const result = await client.query('SELECT name, age, grade FROM your_table WHERE id = $1', [id]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching data from database', err);
    return [];
  }
};

module.exports = { fetchDataById };
