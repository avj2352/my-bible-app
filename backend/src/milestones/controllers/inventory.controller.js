/**
 * CRUD - Controller for Group Model
 */
require('./../../util/colors');
import { InventoryService } from "../services/inventory.service";
import { AuthService } from "../../auth/services/auth.service";

export class InventoryController {

    constructor() {
        this.logger = 'InventoryController';
        this.inventoryService = new InventoryService();
        this.authService = new AuthService();
        // bind context
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getAllInventory = this.getAllInventory.bind(this);
        this.addNewInventory = this.addNewInventory.bind(this);
        this.getInventoryById = this.getInventoryById.bind(this);
        this.updateInventoryById = this.updateInventoryById.bind(this);
        this.deleteInventoryById = this.deleteInventoryById.bind(this);
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
     * PAJ - Fetch all Inventory. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getAllInventory (req, res) {
        const user = this.checkAuthentication (req, res);
        try {
            const result = await this.inventoryService.getAllInventory(user.id);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch all inventory: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /**
     * PAJ - Create a new inventory record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewInventory (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.inventoryService.addNewInventory(req.body, user.id);
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
     * PAJ - Fetch record by id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getInventoryById (req, res) {
        this.checkAuthentication(req, res);
        try {
            const result = await this.inventoryService.getInventoryById(req.params.groupId);
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
    async updateInventoryById (req, res) {
        this.checkAuthentication(req, res);
        try {
            const result = await this.inventoryService.updateInventoryById(req.params.groupId, req.body);
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
    async deleteInventoryById (req, res) {
        this.checkAuthentication(req, res);
        try {
            const result = await this.inventoryService.deleteInventoryById(req.params.groupId);
            console.log(`${this.logger} - Record deleted: `, result);
            return res.sendStatus(200);
        } catch (err) {
            console.log(`${this.logger} Error updating record: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }
}