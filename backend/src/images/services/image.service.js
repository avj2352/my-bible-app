/**
 * PAJ - Image Service Layer
 * */
require('./../../util/colors');
import { ImageModel } from './../models/image.model';
import { encodeFile } from 'base64-min';

export class ImageService {
    constructor() {
        this.logger = 'Image Service';
        //bind context
        // this.getAllImagesSimple = this.getAllImagesSimple.bind(this);
        this.getAllImages = this.getAllImages.bind(this);
        this.getBase64Image = this.getBase64Image.bind(this);
        this.addNewImage = this.addNewImage.bind(this);
        this.getImageById = this.getImageById.bind(this);
        this.deleteImageById = this.deleteImageById.bind(this);
    }

    // // Fetch all records
    // async getAllImagesSimple () {
    //     return new Promise((resolve, reject) => {
    //         ImageModel.find({}, (err, data) => {
    //             if (err) reject(err);
    //             else resolve(data);
    //         });
    //     });
    // }

    // Fetch all records
    async getAllImages () {
        return new Promise((resolve, reject) => {
            ImageModel.find({})
                .populate('users')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    // Convert File to Base64 Stream
    getBase64Image (file) {
        console.log(`${this.logger} - Encrypting file into stream`.info);
        return encodeFile(file);
    }

    // CREATE - new record
    async addNewImage (payload, userId) {
        return new Promise((resolve, reject) => {
            const { title, description, image } = payload;
            const fileStream = this.getBase64Image(image);
            let newImageRecord = new ImageModel({
                title,
                description,
                createdBy: userId,
                data: fileStream
            });
            newImageRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    // RETRIEVE - record by Id
    async getImageById (id) {
        return new Promise((resolve, reject) => {
            ImageModel.find({_id: id})
                .populate('users')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    // DELETE - Record by Id
    async deleteImageById (id) {
        return new Promise((resolve, reject) => {
            ImageModel.deleteOne({_id: id}, (err) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
}