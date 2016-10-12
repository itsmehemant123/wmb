var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8ab36MQ',
    database: 'wmb'
});


//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {
    // response.end('Path: ' + request.url);

    connection.query('SELECT * from accounts', function (err, rows, fields) {
        if(rows) {
            console.log(rows);
        }
    });

}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});