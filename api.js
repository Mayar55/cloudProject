const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// PostgreSQL database configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CloudProject",
  password: "5432",
  port: 5432,
});

async function func1(request, response) {
    const std_id = request.query.id;
    console.log("Received request for ID:", std_id); // Log the ID received in the request
    try {
      const query1 = await pool.query('SELECT * from student WHERE std_id = $1', [std_id]);
      const rows = query1.rows;
      console.log("Query executed. Rows returned:", rows); // Log the rows returned by the query
      if (rows.length > 0) {
        const dataReturned = {
          name: rows[0].std_name,
          id: rows[0].std_id,
          age: rows[0].std_age,
          grade: rows[0].std_gpa
        };
        response.status(200).send(dataReturned);
      } else {
        response.status(201).send(`Data for ID ${std_id} not found`);
      }
    } catch (error) {
      console.error("Error executing query:", error); // Log any errors that occur during query execution
      response.status(500).send("Internal Server Error");
    }
  }
  



app.get("/data", func1);

app.listen(port, () => {
  console.log("Server started at http://localhost:" + port);
});

module.exports = {
    func1
};