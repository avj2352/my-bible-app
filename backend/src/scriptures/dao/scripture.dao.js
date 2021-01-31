require('../../util/colors');
const unirest = require("unirest");
import {
    getBibleAPIKey, getBibleVerseURL, getBibleAPIHost
} from './../../util/config.util';

// CONSTANTS
const GET_VERSE_URL = getBibleVerseURL();
const API_HOST = getBibleAPIHost();
const API_KEY = getBibleAPIKey();

/**
 * DAO Client to access Bible API
 */
export class ScriptureDaoClient {

    constructor() {
        this.logger = `ScriptureDaoClient`;
        console.log(`ScriptureDaoClient - initializing`.info);
        // Bind methods
        this.getScriptureVerse = this.getScriptureVerse.bind(this);
    }


    /**
     * Get Scripture verse from Bible API
     * @param {string} book
     * @param {string} chapter
     * @param {string} verse
     * @returns Promise<any>
     */
    async getScriptureVerse (book, chapter, verse) {
        console.log(`Calling TEST bible api: ${book} - ${chapter}:${verse}`.info);
        const promise = new Promise((resolve, reject) => {
            var unirest = require("unirest");
            var req = unirest("GET", GET_VERSE_URL);

            req.query({
                "Verse": verse,
                "Book": book,
                "chapter": chapter
            });

            req.headers({
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
                "useQueryString": true
            });

            req.end(function (res) {
                if (res.error) reject(res.error);
                resolve(res.body);
            });
        });
        return promise;
    }
}