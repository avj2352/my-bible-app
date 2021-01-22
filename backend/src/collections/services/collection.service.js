
/**
 * PAJ - Collection Service Layer
 * */
require('./../../util/colors');
import { CollectionModel } from './../models/collection.model';

export class CollectionService {
    constructor() {
        this.logger = 'CollectionService';
        //bind context
        this.getAllCollections = this.getAllCollections.bind(this);
        this.getCollectionById = this.getCollectionById.bind(this);
        this.addNewCollection = this.addNewCollection.bind(this);
        this.updateCollectionById = this.updateCollectionById.bind(this);
        this.deleteCollectionById = this.deleteCollectionById.bind(this);
    }

    // Fetch all records by user id
    async getAllCollections (userId) {
        return new Promise((resolve, reject) => {
            CollectionModel.find({createdBy: userId})
                .populate('users')
                .populate('recipes')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    // RETRIEVE - record by Id
    async getCollectionById (id) {
        return new Promise((resolve, reject) => {
            CollectionModel.find({_id: id})
                .populate('users')
                .populate('recipes')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    // CREATE - new record
    async addNewCollection (payload, userId) {
        return new Promise((resolve, reject) => {
            const { title, recipes } = payload;
            const description = payload.description ? payload.description : '';
            let newCollectionRecord = new CollectionModel({
                title,
                description,
                createdBy: userId,
                recipes,
            });
            newCollectionRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    // UPDATE - Recipe by Id, Payload
    async updateCollectionById (id, payload, userId) {
        return new Promise((resolve, reject) => {
            const { title, recipes } = payload;
            const description = payload.description ? payload.description : '';
            CollectionModel.findOneAndUpdate({_id: id}, {
                title,
                description,
                createdBy: userId,
                recipes,
            }, {new: true}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }


    // DELETE - Record by Id
    async deleteCollectionById (id) {
        return new Promise((resolve, reject) => {
            CollectionModel.deleteOne({_id: id}, (err) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
}