'use strict';

module.exports = function (Book) {

    Book.findOnAmazon = function (ISBN, callback) {
        return callback(null, "IMPLEMENT THIS FUNCTION");
    };

    Book.remoteMethod(
        "findOnAmazon",
        {
            description: "Find this book on amazon",
            accepts: [
                {
                    arg: "ISBN",
                    type: "string",
                    required: true
                }
            ],
            returns: {
                arg: 'status',
                type: 'string',
                root: true,
                description: "Returns value"
            },
            https: {
                verb: 'post',
                path: '/findOnAmazon'
            }
        }
    );

    // Supress any classes
    // Book.sharedClass.find('create', true).shared = false;
    // Book.sharedClass.find('upsert', true).shared = false;
    // Book.sharedClass.find('update', true).shared = false;
    // Book.sharedClass.find('deleteById', true).shared = false;

    Book.disableRemoteMethod('create', true);                // Removes (POST) /Books
    Book.disableRemoteMethod('upsert', true);                // Removes (PUT) /Books
    Book.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /Books/:id
    Book.disableRemoteMethod("updateAll", true);               // Removes (POST) /Books/update
    Book.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /Books/:id
    Book.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /Books/change-stream
};
