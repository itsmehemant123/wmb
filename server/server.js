'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');

    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Loopback Explorer at %s%s', baseUrl, explorerPath);

      // var User = app.models.User;
      // User.login({
      //   email: 'caleb.froese@gmail.com',
      //   password: 'password123',
      //   // 314496000 (10 years)
      //   ttl: 314496000
      // }, function (err, accessToken) {
      //   console.log("============================\n> LOOPBACK USER AUTHENTICATION");
      //   if (err) {
      //     console.log("> Error! Could not authorize the user");
      //     console.log("> Loopback JSON error response:");
      //     console.log("> %s", err);
      //   } else {
      //     console.log("> Success! User has been authorized")
      //     console.log("> Access Token: %s", accessToken.id);
      //   }
      //   console.log("> END USER AUTHENTICATION\n============================");
      // });
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  if (require.main === module)
    app.start();
});
