import {GroupModel} from "../../groups/models/group.model";

/**
 * PAJ - Image Service Layer
 * */
require('./../../util/colors');
import { InventoryModel } from './../models/inventory.model';

export class InventoryService {
    constructor() {
        this.logger = 'Inventory Service';
        //bind context
        this.getAllInventory = this.getAllInventory.bind(this);
        this.addNewInventory = this.addNewInventory.bind(this);
        this.updateInventoryById = this.updateInventoryById.bind(this);
        this.getInventoryById = this.getInventoryById.bind(this);
        this.deleteInventoryById = this.deleteInventoryById.bind(this);
    }

    // Fetch all records
    async getAllInventory (userId) {
        return new Promise((resolve, reject) => {
            InventoryModel.find({ createdBy: userId })
                .populate('users')
                .populate('items')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    // CREATE - new record
    async addNewInventory (payload, userId) {
        return new Promise((resolve, reject) => {
            const { title, description, meta } = payload;
            let newRecord = new InventoryModel({
                title,
                description,
                createdBy: userId,
                meta: meta
            });
            newRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    // RETRIEVE - record by Id
    async getInventoryById (id) {
        return new Promise((resolve, reject) => {
            InventoryModel.find({_id: id})
                .populate('users')
                .populate('items')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    // CREATE - new record
    async updateInventoryById (id, payload) {
        return new Promise((resolve, reject) => {
            InventoryModel.findOneAndUpdate({_id: id}, payload, {new: true}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }

    // DELETE - Record by Id
    async deleteInventoryById (id) {
        return new Promise((resolve, reject) => {
            InventoryModel.deleteOne({_id: id}, (err) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
}