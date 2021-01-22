/**
 * CRUD - Controller for Collection Model
 */
require('./../../util/colors');
import { CollectionService } from "../services/collection.service";
import { AuthService } from "../../auth/services/auth.service";

export class CollectionController {

    constructor() {
        this.logger = 'CollectionController';
        this.collectionService = new CollectionService();
        this.authService = new AuthService();
        // bind context
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getAllCollections = this.getAllCollections.bind(this);
        this.getCollectionsById = this.getCollectionsById.bind(this);
        this.addNewCollection = this.addNewCollection.bind(this);
        this.updateCollectionById = this.updateCollectionById.bind(this);
        this.deleteCollectionById = this.deleteCollectionById.bind(this);
    }

    /**
     * PAJ - Check Cookie header present
     * @param req
     * @param res
     * @returns user / 401
     */
    checkAuthentication (req, res) {
        if (!this.authService.authenticateUser(req)) {
            return res.sendStatus(401);
        } else {
            return req.user;
        }
    }

    /**
     * PAJ - Fetch all Collections created by the user.
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getAllCollections (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.collectionService.getAllCollections(user.id);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch all collections: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /**
     * PAJ - Fetch record by id.
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getCollectionsById (req, res) {
        try {
            const result = await this.collectionService.getCollectionById(req.params.collectionId);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Create a new recipe record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewCollection (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.collectionService.addNewCollection(req.body, user.id);
            console.log(`${this.logger} - New Record added`, result);
            return res.sendStatus(201);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`${this.logger} Duplicate Record: ${JSON.stringify(err)}`.error);
                return res.sendStatus(400);
            } else {
                console.log(`${this.logger} Internal Server error: ${JSON.stringify(err)}`.error);
                return res.sendStatus(500);
            }
        }
    }



    /**
     * PAJ - Update record by Id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateCollectionById (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.collectionService.updateCollectionById(req.params.collectionId, req.body, user.id);
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
    async deleteCollectionById (req, res) {
        this.checkAuthentication(req, res);
        try {
            const result = await this.collectionService.deleteCollectionById(req.params.collectionId);
            console.log(`${this.logger} - Record deleted: `, result);
            return res.sendStatus(200);
        } catch (err) {
            console.log(`${this.logger} Error updating record: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }
}