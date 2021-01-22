
/**
 * PAJ - Collection Service Layer
 * */
require('./../../util/colors');
import { CommentModel } from './../models/comment.model';

export class CommentService {
    constructor() {
        this.logger = 'CommentService';
        //bind context
        this.getCommentsByRecipeId = this.getCommentsByRecipeId.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
        this.updateCommentById = this.updateCommentById.bind(this);
        this.deleteCommentById = this.deleteCommentById.bind(this);
    }



    // RETRIEVE - record by Id
    async getCommentsByRecipeId (recipeId) {
        return new Promise((resolve, reject) => {
            CommentModel.find({recipe: recipeId})
                .populate('recipes')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     *
     * @param payload {name, comment, likes, recipe}
     * @returns {Promise<unknown>}
     */
    async addNewComment (payload) {
        return new Promise((resolve, reject) => {
            const { name, comment, likes, recipe } = payload;
            let newRecord = new CommentModel({
                name,
                comment,
                likes,
            });
            newRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * @param id
     * @param payload {name, comment, likes, recipe}
     * @returns {Promise<unknown>}
     */
    async updateCommentById ( id, payload ) {
        return new Promise((resolve, reject) => {
            const { name, comment, likes, recipe } = payload;
            CommentModel.findOneAndUpdate({_id: id }, {
                name,
                comment,
                likes,
                recipe,
            }, {new: true}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }


    // DELETE - Record by Id
    async deleteCommentById (id, userId) {
        return new Promise((resolve, reject) => {
            CommentModel.deleteOne({_id: id }, (err) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
}