var http = require('http');
var mysql = require('mysql');
var express = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8ab36MQ',
    database: 'wmb',
    multipleStatements: true
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
     * /api/v1/account/validate?usr=int&pwd=string
     */

    var accountUsername = req.query.usr;
    var accountPassword = req.query.pwd;

    if (accountUsername && accountPassword) {
        var sqlQuery = 'SELECT accountId FROM accounts WHERE accountUsername = ? AND accountPassword = ?';
        connection.query(sqlQuery, [accountUsername, accountPassword], function (err, rows, fields) {
            if (err) {
                // An error occurred within the query
                console.log("An error occured: " + err);
            } else if (rows.length) {
                // Query returned a valid reponse

                // Get data from the query response
                var accountId = rows[0].accountId;

                // Set the session
                var token = Math.random().toString(36).substring(7);
                
                connection.query('UPDATE accounts SET accountToken = ? WHERE accountId = ?', [token, accountId], function (err, rows, fields) {
                    if (err) {
                        console.log("An error occured: " + err);
                    } else {
                        // Create a JSON response
                        var JSONresponse = '{"token":' +  token + '}';

                        // Send the JSON response containing the token
                        res.setHeader('Content-Type', 'application/json');
                        res.write(JSONresponse);
                        res.end();
                    }
                });

            } else {
                // Query returned no rows
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