const path = require('path');
const express = require('express');
const passport  = require('passport');
const cookieSession = require('cookie-session');
require('./util/colors');
require('./util/db.connect');

import routes from './routes/app.routes';
import {getCookieKeySignature, getCookieSessionMaxAge, getPORT} from './util/config.util';

const app = express();
const PORT = getPORT();

// Tell express that it needs to add cookies
app.use(cookieSession({
    maxAge: getCookieSessionMaxAge(),
    keys: [getCookieKeySignature()]
}));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use('/', express.static(path.join(__dirname,'/build')));
// Failure
app.get('/failure', (req, res)=>{
    res.send('Error: Authentication Failed, Please retry');
});

// //Serving static files
app.use('/', express.static(path.join(__dirname,'build')));

app.use(passport.initialize());
app.use(passport.session());

// configure routes
routes(app);

const server = app.listen(PORT, ()=>{
    console.log(`Server listening at ${server.address().port}`.info);
});