require('../../util/colors');
import { ScriptureModel } from '../models/scripture.model';
import { ScriptureDaoClient } from '../dao/scripture.dao';

export class ScriptureService {
    constructor() {
        this.logger = `ScriptureService`;
        this.daoClient = new ScriptureDaoClient();
        // bind context
        this.getScriptures = this.getScriptures.bind(this);
        this.addNewScripture = this.addNewScripture.bind(this);
        this.getScriptureById = this.getScriptureById.bind(this);
        this.updateScriptureById = this.updateScriptureById.bind(this);
        this.deleteScriptureById = this.deleteScriptureById.bind(this);
        this.searchFullText = this.searchFullText.bind(this);
        this.searchPartialText = this.searchPartialText.bind(this);
        this.fetchScriptureVerse = this.fetchScriptureVerse.bind(this);
    }

    /**
     * fetch all group records
     * @returns Promise<any>
     */
    async getScriptures () {
        return new Promise((resolve, reject) => {
            ScriptureModel.find({}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * Create a new record
     * @param payload { book, chapter, verse }
     * @returns Promise<any>
     */
    async addNewScripture (payload) {
        return new Promise((resolve, reject) => {
            const { book, chapter, verse } = payload;
            let newScriptureRecord = new ScriptureModel({book, chapter, verse });
            newScriptureRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * get group record details by Id
     * @param id { string }
     * @returns Promise<any>
     */
    async getScriptureById (id) {
        return new Promise((resolve, reject) => {
            ScriptureModel.find({_id: id}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * update group record details by its Id
     * @param id { string }
     * @param payload { book, chapter, verse }
     * @returns Promise<any>
     */
    async updateScriptureById (id, payload) {
        return new Promise((resolve, reject) => {
            const { book, chapter, verse } = payload;
            ScriptureModel.findOneAndUpdate({_id: id}, {
                book, chapter, verse
            }, {new: true}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }

    /**
     * delete group record details by its Id
     * @param id { string }
     * @returns Promise<any>
     */
    async deleteScriptureById (id) {
        return new Promise((resolve, reject) => {
            ScriptureModel.deleteOne({_id: id}, (err) => {
                if (err) reject(err);
                else resolve(); // Get JSON format of contact
            });
        });
    }

    /**
     * search full text in Group Model
     * @param text {string} full text query string
     * @returns Promise<any>
     */
    async searchFullText (text) {
        console.log(`${this.logger} - Calling Full text query: `, text);
        return new Promise((resolve, reject) => {
            ScriptureModel.find({$text: {$search: text}}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }

    /**
     * search partial text in Group Model
     * @param partial {string} partial query string
     * @returns Promise<any>
     */
    async searchPartialText (partial) {
        console.log(`${this.logger} - Calling Partial text query: `, text);
        return new Promise((resolve, reject) => {
            ScriptureModel.find({description: {$regex: new RegExp(partial)}}, {_id:0, __v:0}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }

    /**
     * Call ScriptDao to fetch Bible API verse
     * @param book {string}
     * @param chapter {number}
     * @param verse {number}
     * @returns Object | Error
     * 
     */
    async fetchScriptureVerse(book, chapter, verse) {
        try {
            const result = await this.daoClient.getScriptureVerse();
            return result;
        } catch (err) {
            throw new Error(`Error fetching scripture api: ${err}`);
        }
    }
}