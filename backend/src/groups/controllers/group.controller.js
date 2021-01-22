/**
 * CRUD - Controller for Group Model
 */
require('./../../util/colors');
import {GroupService} from "../services/group.service";
import {AuthService} from "../../auth/services/auth.service";

export class GroupController {

    constructor() {
        this.logger = 'GroupController';
        // Inject
        this.groupService = new GroupService();
        this.authService = new AuthService();
        // bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.addNewGroup = this.addNewGroup.bind(this);
        this.getGroupById = this.getGroupById.bind(this);
        this.updateGroupById = this.updateGroupById.bind(this);
        this.deleteGroupById = this.deleteGroupById.bind(this);
        this.search = this.search.bind(this);
    }

    /**
     * PAJ - validatePayload Group model
     * @param req
     * @returns boolean
     */
    validatePayload (req) {
        return !req.body.title || req.body.title === '' ||
            !req.body.slug || req.body.slug === '' ||
            !req.body.description || req.body.description === '' ||
            !req.body.hasOwnProperty(`premium`);
    }

    /**
     * PAJ - Fetch all Groups. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getGroups (req, res) {
        try {
            const user = this.authService.fetchUserDetails(req);
            if (user) {
                const result = await this.groupService.getAllGroups();
                return res.json(result);
            } else {
                const result = await this.groupService.filterGroupsWithoutPremium(false);
                return res.json(result);
            }
        } catch (err) {
            console.log(`${this.logger} error fetch all groups: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /**
     * PAJ - Create a new group record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewGroup (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        // only admin can access
        if (!this.authService.checkIfAdminUser(user)) return res.sendStatus(401);
        // create record
        if (this.validatePayload(req)) return res.sendStatus(400);
        try {
            const result = await this.groupService.addNewGroup({
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                premium: req.body.premium
            });
            console.log(`${this.logger} - New Record added`, result);
            return res.status(201).send(result._id);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`${this.logger} - Duplicate Record: ${JSON.stringify(err)}`.error);
                return res.status(400).send('Duplicate Record');
            }
            else if (err.errors.premium.name === 'ValidatorError') {
                    console.log(`${this.logger} - Bad Request: ${JSON.stringify(err)}`.error);
                    return res.sendStatus(400);
            }
            else {
                console.log(`${this.logger} - Internal Server Error: ${JSON.stringify(err)}`.error);
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
    async getGroupById (req, res) {
        // check if authenticated
        console.log(`${this.logger} - Group ID is: ${JSON.stringify(req.params.groupId)}`.info);
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.groupService.getGroupById(req.params.groupId);
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
    async updateGroupById (req, res) {
        // check if authenticated
        console.log(`${this.logger} - Update group ID is: ${JSON.stringify(req.params.groupId)}`.info);
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) {
            return res.sendStatus(400);
        }
        try {
            const result = await this.groupService.updateGroupById(req.params.groupId, {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                premium: req.body.premium,
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
    async deleteGroupById (req, res) {
        // check if authenticated
        console.log(`${this.logger} - Delete group ID: ${JSON.stringify(req.params.groupId)}`.info);
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.groupService.deleteGroupById(req.params.groupId);            
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
                result = await this.groupService.searchFullText(req.query.text);
                return res.status(200).send(result);
            } else if (req.query.type === 'partial') {
                result = await this.groupService.searchPartialText(req.query.text);
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