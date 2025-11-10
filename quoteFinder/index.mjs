 import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

//setting up database connection pool
const pool = mysql.createPool({
    host: "axxb6a0z2kydkco3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "fb6a9bfa1oajucrk",
    password: "v85hmtat523uwsgt",
    database: "rh8p3vf61vwuswky",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', async(req, res) => {
    let authorsSql = `SELECT authorId, firstName, lastName
                      FROM authors
                      ORDER BY lastName`;
    const [authorsRows] = await pool.query(authorsSql);

    let categorySql = `SELECT DISTINCT category
                       FROM quotes`;
    const [categoryRows] = await pool.query(categorySql);

    res.render('home.ejs', { authorsRows, categoryRows });
});

// local API for author info
app.get('/api/authors/:authorId', async(req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT *
               FROM authors
               WHERE authorId = ?`;
    const [rows] = await pool.query(sql, [authorId]);
    res.send(rows);
});

app.get('/searchByKeyword', async (req, res) => {
    let keyword = req.query.keyword;
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE quote LIKE ?`;
    let sqlParams = [`%${keyword}%`];
    const [rows] = await pool.query(sql, sqlParams);
    res.render('results.ejs', { rows });
});

app.get('/searchByAuthor', async (req, res) => {
    let authorId = req.query.authorId;
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE authorId = ?`;
    let sqlParams = [`${authorId}`];
    const [rows] = await pool.query(sql, sqlParams);
    res.render('results.ejs', { rows });
});

app.get('/searchByCategory', async (req, res) => {
    let category = req.query.category;
    let sql = `SELECT authorId, category, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE category LIKE ?`;
    let sqlParams = [`${category}`];
    const [rows] = await pool.query(sql, sqlParams);
    res.render('results.ejs', { rows });
});

app.get("/dbTest", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, () => {
    console.log("Express server running")
})