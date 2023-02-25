var mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "capstone",
  database: "nodejs"
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/views/register.html'));
});


  
  app.post('/', function(request, response) {
	// Capture the input fields
	let username = request.body.useremail;
	let password = request.body.userpass;
    let nameuser = request.body.nameofuser
	// Ensure the input fields exists and are not empty
	if (username && password && nameuser) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		var sql = "INSERT INTO userlogin (name, address) VALUES (?, ?, ?)"
            connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted, ID: " + result.insertId);
        });
        
        connection.query('SELECT * FROM userlogin WHERE user_name = ? AND user_pass = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				
                
				response.redirect('/views/index.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Make sure all fields are filled in');
		response.end();
	}
});

app.get('/views/index.html', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome new user, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Something went wrong!');
	}
	response.end();
});

app.listen(3000);