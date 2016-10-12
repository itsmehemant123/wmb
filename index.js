var http = require('http');
var mysql = require('mysql');
var express = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8ab36MQ',
    database: 'wmb'
});

var app = express();
const SERVER_PORT = 8080;


app.get('/', function (req, res) {
    res.send('World Meme Back Webpage Here');
});

app.get('/api/v1/getaccounts', function (req, res) {
    // Get accounts api endpoint
    res.setHeader('Content-Type', 'application/json');
    connection.query('SELECT * from accounts', function (err, rows, fields) {
        if (rows) {
            res.write(JSON.stringify(rows));
        } else {
            res.write("Empty");
        }

        res.end();
    });

});

// Create the server
app.listen(SERVER_PORT, function () {
    console.log('Example app listening on port ' + SERVER_PORT);
});