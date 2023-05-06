// const mysql = require('mysql');
const { Pool } = require('pg');
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432, // or your custom port number
  });

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      // console.log('Database connected successfully!', res.rows[0].now);
    }
    // release the client to the pool when done
    // pool.end();
  });


pool.query(`CREATE TABLE IF NOT EXISTS login_details (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
  )`, (err, res) => {
    if (err) {
      console.error('Error creating table', err.stack);
    } else {
      // console.log('Table created successfully!');
    }
    // release the client to the pool when done
    pool.end();
  });
  

  app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('static'));
app.use(express.static(__dirname));

// http://localhost:3000/
app.get('/', function(req, res) {
	// Render login template
	res.sendFile(path.join(__dirname + '/login.html'));
  // res.redirect('/home');
});

// app.get('/style.css', function(req, res) {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(__dirname + '/style.css');
// });

app.get('/auth', function(req, res) {
	// Capture the input fields
	"Welcome to my page";
  // res.sendFile(__dirname + '/home.html');
});

app.post('/home', function(req, res) {
	// If the user is loggedin
	"Hello Deep!"
  res.redirect('/home');
});

app.get('/home', function(req, res) {
  res.sendFile(__dirname + '/home.html');
});

app.listen(3000, () =>{
    console.log("Server listening on port 3000")
})