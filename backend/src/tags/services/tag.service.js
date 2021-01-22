require('./../../util/colors');
import { TagModel } from '../models/tag.model';

export class TagService {
    constructor() {
        this.logger = `TagService`;
        // bind context
        this.getTags = this.getTags.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.getTagById = this.getTagById.bind(this);
        this.updateTagById = this.updateTagById.bind(this);
        this.deleteTagById = this.deleteTagById.bind(this);
    }

    /**
     * fetch all group records
     * @returns Promise<any>
     */
    async getTags () {
        return new Promise((resolve, reject) => {
            TagModel.find({}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * Create a new record
     * @param payload { name, description }
     * @returns Promise<any>
     */
    async addNewTag (payload) {
        return new Promise((resolve, reject) => {
            const { name, description } = payload;
            let newTagRecord = new TagModel({ name, description });
            newTagRecord.save((err, data) => {
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
    async getTagById (id) {
        return new Promise((resolve, reject) => {
            TagModel.find({_id: id}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }



    /**
     * update group record details by its Id
     * @param id { string }
     * @param payload { name, description }
     * @returns Promise<any>
     */
    async updateTagById (id, payload) {
        return new Promise((resolve, reject) => {
            TagModel.findOneAndUpdate({_id: id}, payload, {new: true}, (err, data) => {
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
    async deleteTagById (id) {
        return new Promise((resolve, reject) => {
            TagModel.deleteOne({_id: id}, (err) => {
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
            TagModel.find({$text: {$search: text}}, (err, data) => {
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
            TagModel.find({description: {$regex: new RegExp(partial)}}, {_id:0, __v:0}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
}