'use strict';

module.exports = function (Account) {

    Account.transferMemes = function (fromAccountId, toAccountId, memeId, amount, callback) {
        return callback(null, "IMPLEMENT THIS FUNCTION" + fromAccountId + toAccountId + memeId + amount);
    };

    Account.remoteMethod(
        "transferMemes",
        {
            description: "Find this book on amazon",
            accepts: [
                {
                    arg: "fromAccountId",
                    type: "number",
                    required: true
                },
                {
                    arg: "toAccountId",
                    type: "number",
                    required: true
                },
                {
                    arg: "memeId",
                    type: "number",
                    required: true
                },
                {
                    arg: "amount",
                    type: "number",
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
                path: '/transferMemes'
            }
        }
    );
};
