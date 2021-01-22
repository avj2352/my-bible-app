import converter from "../../util/showdown-converter";
require('./../../util/colors');
import { ItemModel } from '../models/item.model';

export class ItemService {
    constructor() {
        this.logger = `ItemService`;
        // bind context
        this.getItems = this.getItems.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.getItemById = this.getItemById.bind(this);
        this.updateItemById = this.updateItemById.bind(this);
        this.deleteItemById = this.deleteItemById.bind(this);
        this.searchFullText = this.searchFullText.bind(this);
        this.searchPartialText = this.searchPartialText.bind(this);
    }

    /**
     * fetch all group records
     * @returns Promise<any>
     */
    async getItems () {
        return new Promise((resolve, reject) => {
            ItemModel.find({}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * Create a new record
     * @param payload { name, description, html }
     * @returns Promise<any>
     */
    async addNewItem (payload) {
        return new Promise((resolve, reject) => {
            const { name, description, html } = payload;
            let newItemRecord = new ItemModel({name, description, html });
            newItemRecord.save((err, data) => {
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
    async getItemById (id) {
        return new Promise((resolve, reject) => {
            ItemModel.find({_id: id}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * update group record details by its Id
     * @param id { string }
     * @param payload { name, description, html }
     * @returns Promise<any>
     */
    async updateItemById (id, payload) {
        return new Promise((resolve, reject) => {
            const { name, description, html } = payload;
            ItemModel.findOneAndUpdate({_id: id}, {
                name, description, html
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
    async deleteItemById (id) {
        return new Promise((resolve, reject) => {
            ItemModel.deleteOne({_id: id}, (err) => {
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
        console.log('Calling Full text query: ', text);
        return new Promise((resolve, reject) => {
            ItemModel.find({$text: {$search: text}}, (err, data) => {
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
        return new Promise((resolve, reject) => {
            ItemModel.find({description: {$regex: new RegExp(partial)}}, {_id:0, __v:0}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
}