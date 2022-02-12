module.exports = (express, app) =>{
    var userDB = require('../models/user');
    var tokenDB = require('../models/access_tokens')

    const router = express.Router();

    // OAuth imports
    const oAuthService = require("../auth/tokenService")(userDB, tokenDB);
    const oAuth2Server = require("node-oauth2-server");

    app.oauth = oAuth2Server({
        model: oAuthService,
        grants: ["password"],
        debug: true,
    });
    app.use(app.oauth.errorHandler());

    //AUTH routes
    const authenticator = require("../auth/authenticator")(userDB);
    const routes = require("./routeAuth")(
        router,
        app,
        authenticator
    );

    app.use("/auth", routes);

    //TEST route
    const testAPIService = require('../controllers/testApi');
    const testAPIRoutes = require('./routesTest')(
        router,
        app,
        testAPIService
    );
    app.use("/test", testAPIRoutes);

   

}
