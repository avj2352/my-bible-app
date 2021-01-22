/**
 * CRUD - Authentication flow
 */
require('./../../util/colors');
const passport  = require('passport');
const passportStrategy = require('passport-google-oauth20');
// custom
import { getGoogleClientId, getGoogleClientSecret, getGoogleOAuthRedirect } from "../../util/config.util";
import { AuthService } from '../services/auth.service';



export class AuthController {
    
    constructor () {
        let existingUser;
        const GoogleStrategy  = passportStrategy.Strategy;
        // callback when done method is invoked on passport.use
        passport.serializeUser( async(user, done) => {
            // console.log('User serialized', user);
            await done(null, user.id);
        });

        // callback when done method is invoked on passport.use

        // Eg: This functino is called for getUserDetails GET request
        passport.deserializeUser(async (id, done) => {
            const record = await this.authService.findUserRecordById(id);
            if (record) {
                await done(null, record);
            }
        });

        passport.use(new GoogleStrategy({
            clientID: getGoogleClientId(),
            clientSecret: getGoogleClientSecret(),
            callbackURL: getGoogleOAuthRedirect(),
            proxy: true
        }, async (accessToken, refreshToken, profile, done) => {
            const result = await this.authService.findUserRecordByGoogleId(profile.id);
            if(!result) {
                const record = await this.authService.addNewUser(profile);
                existingUser = record;
                console.log(`New User - Add Record`.info, existingUser);
                await done(null, existingUser);
            } else {
                existingUser = result;
                console.log(`User record already exists`.info, existingUser);
                await done(null, existingUser);
            }
        }));
        this.authService = new AuthService();
        //bind
        this.authenticate = this.authenticate.bind(this);
        this.authCallback = this.authCallback.bind(this);
    }

    // google authenticate method
    authenticate = passport.authenticate('google',
        {session: 'false', scope: ['openid', 'email', 'profile']});

    // callback handler
    authCallback = passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/failure'
    });

    // testing OAuth
    userDetails (req, res) {
        console.log('Request user: ', req.user);
        if (req.user) {
            const {role, status, collectionCount, draftCount, _id, name, email} = req.user;
            res.send({
                _id, name, email, role, status, collectionCount, draftCount
            });
        } else {
            res.sendStatus(401);
        }
    }

    // logout
    logoutUser (req, res) {
        req.logout(); // This is passport special feature added to the request. WORKS only with Cookie session
        res.redirect('/');
    }

}

