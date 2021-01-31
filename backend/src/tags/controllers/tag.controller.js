/**
 * CRUD - API Controller for Tag Model
 */

require('./../../util/colors');
import {AuthService} from "../../auth/services/auth.service";
import {TagService} from "../services/tag.service";

export class TagController {

    constructor() {
        this.logger = 'Tag Controller';
        this.tagService = new TagService();
        this.authService = new AuthService();
        //bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.getTags = this.getTags.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.getTagById = this.getTagById.bind(this);
        this.updateTagById = this.updateTagById.bind(this);
        this.deleteTagById = this.deleteTagById.bind(this);
        this.search = this.search.bind(this);
    }

    /***
     * Validate payload
     * @param req
     * @returns boolean
     */
    validatePayload (req) {
        return !req.body.name || req.body.name === '' ||
            !req.body.description || req.body.description === '';
    }


    /**
     * PAJ - Fetch all Groups. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getTags (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.tagService.getTags();
            return res.json(result);
        } catch (err) {
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
    async addNewTag (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        // validate payload
        if (this.validatePayload(req)) {
            return res.sendStatus(400);
        }
        try {
            const result = await this.tagService.addNewTag (req.body);
            console.log(`${this.logger} - New Record added`, result);
            return res.status(201).send(result._id);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`${this.logger} Duplicate Record: ${JSON.stringify(err)}`.error);
                return res.status(400).send('Duplicate Record');
            } else if (err.errors && err.errors.premium.name === 'ValidatorError') {
                console.log(`${this.logger} - Bad Request: ${JSON.stringify(err)}`.error);
                return res.sendStatus(400);
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
    async getTagById (req, res) {
        console.log(`${this.logger} - Tag ID is: ${JSON.stringify(req.params.id)}`.info);
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.tagService.getTagById(req.params.id);
            return res.json(result);
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
    async updateTagById (req, res) {
        console.log(`${this.logger} - Tag ID is: ${JSON.stringify(req.params.id)}`.info);
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) {
            return res.sendStatus(400);
        }
        try {
            const result = await this.tagService.updateTagById(req.params.id, {
                name: req.body.name,
                description: req.body.description
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
    async deleteTagById(req, res) {
        console.log(`${this.logger} - Tag ID is: ${JSON.stringify(req.params.id)}`.info);
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            await this.tagService.deleteTagById(req.params.id);
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
    async search(req, res) {
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
                result = await this.tagService.searchFullText(req.query.text);
                return res.status(200).send(result);
            } else if (req.query.type === 'partial') {
                result = await this.tagService.searchPartialText(req.query.text);
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