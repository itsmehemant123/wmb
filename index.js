var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8ab36MQ',
    database: 'wmb'
});

const SERVER_PORT = 8080;


function handleRequest(request, response) {

    if (request.url == '/getaccounts') {
        // Set the header to return json object
        response.setHeader('Content-Type', 'application/json');

        connection.query('SELECT * from accounts', function (err, rows, fields) {
            if (rows) {
                response.write(JSON.stringify(rows));
            } else {
                response.write("Empty");
            }

            response.end();
        });
    }

    
}

// Generate and run a server on the specified port
var server = http.createServer(handleRequest);
server.listen(SERVER_PORT, function () {
    // Callback triggered when server is successfully listening
    console.log("Meme supreme listening on: http://localhost:" + SERVER_PORT);
});