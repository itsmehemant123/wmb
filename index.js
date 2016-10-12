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

app.get('/api/v1/account/validate', function (req, res) {
    /**
     * Endpoint validates a user, setting its session server-side, AND
     * also returning the variables so that the market can set the session
     * on behalf of the client.
     * 
     * Address should be:
     * /api/v1/account/validate?id=int&pwd=string
     */

    var accountId = req.query.id;
    var accountPassword = req.query.pwd;

    if (accountId && accountPassword) {
        var sqlQuery = 'SELECT * FROM accounts WHERE accountId = ? AND accountPassword = ?';
        connection.query(sqlQuery, [accountId, accountPassword], function (err, rows, fields) {
            if (rows) {
                // Send a JSON response containing the applicable data
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(rows));
                res.end();
            } else {
                res.end("Empty");
            }
        });
    } else {
        res.end("API requires id and pwd");
    }
});

// Create the server
app.listen(SERVER_PORT, function () {
    console.log('Example app listening on port ' + SERVER_PORT);
});