require('../../util/colors');
const unirest = require("unirest");
import { getBibleAPI } from './../../util/config.util';

// CONSTANTS
const GET_VERSE_URL = "https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter";
const API_HOST = "ajith-holy-bible.p.rapidapi.com";

/**
 * DAO Client to access Bible API
 */
export class ScriptureDaoClient {

    constructor() {
        this.logger = `ScriptureDaoClient`;
        console.log(`ScriptureDaoClient - initializing`.info);
        const apiKey = getBibleAPI();
        this.request = unirest("GET", GET_VERSE_URL);
        this.request.headers({
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": API_HOST,
            "useQueryString": true
        });
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
        const promise = new Promise((resolve, reject)=>{
            this.request.query({
                "Verse": verse,
                "Book": book,
                "chapter": chapter
            });
            this.request.end(function (result) {
                if (result.error) reject(result.error);
                else resolve(result.body);
            });
        });
        return promise;
    }
}