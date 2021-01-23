/**
 * CRUD - API Controller for Scripture Model
 */

require('../../util/colors');
import { AuthService } from "../../auth/services/auth.service";
import { ScriptureService } from "../services/scripture.service";

export class ScriptureController {

    constructor() {
        this.logger = 'Scripture Controller';
        this.scriptureService = new ScriptureService();
        this.authService = new AuthService();
        //bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.fetchScriptureVerse = this.fetchScriptureVerse.bind(this);
        this.getScriptures = this.getScriptures.bind(this);
        this.addNewScripture = this.addNewScripture.bind(this);
        this.getScriptureById = this.getScriptureById.bind(this);
        this.updateScriptureById = this.updateScriptureById.bind(this);
        this.deleteScriptureById = this.deleteScriptureById.bind(this);
        this.search = this.search.bind(this);
    }

    /**
     * PAJ - validatePayload Scripture model
     * @param req
     * @returns boolean
     */
    validatePayload (req) {
        return !req.body.book || req.body.book === '' ||
            !req.body.chapter || req.body.chapter === '' ||
            !req.body.verse || req.body.verse === '';
    }

    /**
     * PAJ - Fetch Scripture Verse. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async fetchScriptureVerse (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.sendStatus(400);
        try {
            const { book, chapter, verse } = req.body;
            const result = await this.scriptureService.fetchScriptureVerse(book, chapter, verse);
            return res.json(result);
        }catch(err) {
            console.log(`${this.logger} - Error fetching Scripture verse API ${JSON.stringify(err)}`.error);
            res.sendStatus(500);
        }
    }

    /**
     * PAJ - Fetch all records. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getScriptures (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.scriptureService.getScriptures();
            return res.json(result);
        }catch(err) {
            console.log(`${this.logger} - Error fetching all records ${JSON.stringify(err)}`.error);
            res.sendStatus(500);
        }
    }

    /**
     * PAJ - Create a new record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewScripture (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.sendStatus(400);
        try {
            const result = await this.scriptureService.addNewScripture ({
                book: req.body.book,
                chapter: req.body.chapter,
                verse: req.body.verse
            });
            console.log(`${this.logger} - New Record added`, result);
            return res.status(201).send(result._id);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`${this.logger} Duplicate Record: ${JSON.stringify(err)}`.error);
                return res.status(400).send('Duplicate Record');
            } else {
                console.log(`${this.logger} Internal Server error: ${JSON.stringify(err)}`.error);
                return res.sendStatus(500);
            }
        }
    }

    /**
     * PAJ - Fetch record by id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getScriptureById (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.scriptureService.getScriptureById(req.params.id);
            return res.status(200).json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Update record by Id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateScriptureById (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.sendStatus(400);
        try {
            const result = await this.scriptureService.updateScriptureById(req.params.id, {
                book: req.body.book,
                chapter: req.body.chapter,
                verse: req.body.verse
            });
            console.log(`${this.logger} - Record updated: `, result);
            return res.sendStatus(200);
        } catch (err) {
            console.log(`${this.logger} Error updating record: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Delete record by Id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async deleteScriptureById(req, res) {
        console.log(`${this.logger} - Delete sciprture ID: ${JSON.stringify(req.params.id)}`.info);
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.scriptureService.deleteScriptureById(req.params.id);
            console.log(`${this.logger} - Record deleted: `, result);
            return res.sendStatus(200);
        } catch (err) {
            console.log(`${this.logger} Error updating record: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Full Text Search in Groups Model
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async search (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        console.log(`${this.logger} - Search Text: ${JSON.stringify(req.query.text)}`.info);
        if (
            !req.query.text || req.query.text === '' ||
            !req.query.type || req.query.type === ''
        ) return res.sendStatus(400);
        try {
            let result;
            console.log(`${this.logger} - Search Type is: ${req.query.type}`.info);
            if (req.query.type === 'full') {
                result = await this.scriptureService.searchFullText(req.query.text);
                return res.status(200).send(result);
            } else if (req.query.type === 'partial') {
                result = await this.scriptureService.searchPartialText(req.query.text);
                return res.status(200).send(result);
            } else {
                return res.sendStatus(400);
            }
        } catch (err) {
            console.log(`${this.logger} Error searching : ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }
}