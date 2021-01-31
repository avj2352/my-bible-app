/**
 * PAJ - Helper functions to load all environment variables from this place
 * Easier to configure env variables on HEROKU / AWS - Refer this file
 * Dependency on config library and envrionment variables OR
 * development.json or default.json
 */
const config = require('config');
const serverConfig = config.get('server');
const dbConfig = config.get('db');
const googleConfig = config.get('google');
const jwtConfig = config.get('jwt');
const bibleApiConfig = config.get('bible_api');

// MAIN ==============================================

export function getPORT () {
    return process.env.PORT || serverConfig.port;
}

// DB ===============================================

export function getDBUri () {
    return process.env.DB || dbConfig.uri;
}

// GOOGLE =============================================

export function getGoogleClientId () {
    return process.env.gClientId || googleConfig.client_id;
}

export function getGoogleClientSecret () {
    return process.env.gClientSecret || googleConfig.client_secret;
}

export function getGoogleOAuthRedirect () {
    return process.env.gOAuthRedirect || googleConfig.oauth_redirect_uri;
}

// BIBLE API (RAPIDSHARE) ==============================

export function getBibleAPIKey () {
    return process.env.bibleApiKey || bibleApiConfig.api_key;
}

export function getBibleVerseURL () {
    return process.env.bibleApiVerseUrl || bibleApiConfig.get_verse_url;
}

export function getBibleAPIHost () {
    return process.env.bibleApiHost || bibleApiConfig.api_host;
}

/**
 * PAJ - get maxAge in days
**/
export function getCookieSessionMaxAge () {
    const days = process.env.jwtExpiry || jwtConfig.expiry;
    return days*24*60*60*1000;
}

export function getCookieKeySignature () {
    return process.env.jwtSecret || jwtConfig.secret;
}