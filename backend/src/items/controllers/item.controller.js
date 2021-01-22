/**
 * CRUD - API Controller for Item Model
 */

require('./../../util/colors');
import { AuthService } from "../../auth/services/auth.service";
import { ItemService } from "../services/item.service";

export class ItemController {

    constructor() {
        this.logger = 'Item Controller';
        this.itemService = new ItemService();
        this.authService = new AuthService();
        //bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.getItems = this.getItems.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.getItemById = this.getItemById.bind(this);
        this.updateItemById = this.updateItemById.bind(this);
        this.deleteItemById = this.deleteItemById.bind(this);
        this.search = this.search.bind(this);
    }

    /**
     * PAJ - validatePayload Group model
     * @param req
     * @returns boolean
     */
    validatePayload (req) {
        return !req.body.name || req.body.name === '' ||
            !req.body.description || req.body.description === '' ||
            !req.body.html || req.body.html === '';
    }

    /**
     * PAJ - Fetch all records. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getItems (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.itemService.getItems();
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
    async addNewItem (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.sendStatus(400);
        try {
            const result = await this.itemService.addNewItem ({
                name: req.body.name,
                description: req.body.description,
                html: req.body.html
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
    async getItemById (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.itemService.getItemById(req.params.itemId);
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
    async updateItemById (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.sendStatus(400);
        try {
            const result = await this.itemService.updateItemById(req.params.itemId, {
                name: req.body.name,
                description: req.body.description,
                html: req.body.html
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
    async deleteItemById(req, res) {
        console.log(`${this.logger} - Delete item ID: ${JSON.stringify(req.params.itemId)}`.info);
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.itemService.deleteItemById(req.params.itemId);
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
                result = await this.itemService.searchFullText(req.query.text);
                return res.status(200).send(result);
            } else if (req.query.type === 'partial') {
                result = await this.itemService.searchPartialText(req.query.text);
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