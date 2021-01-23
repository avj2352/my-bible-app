/**
 * PAJ - Recipe Service Layer
 * */
require('./../../util/colors');
import { RecipeModel } from './../models/recipe.model';

export class RecipeService {
    constructor() {
        this.logger = 'RecipeService';
        //bind context
        this.getAllRecipes = this.getAllRecipes.bind(this);
        this.getPublicRecipes = this.getPublicRecipes.bind(this);
        this.getRecipesByUserId = this.getRecipesByUserId.bind(this);
        this.getAllRecipesByUserId = this.getAllRecipesByUserId.bind(this);
        this.getRecipebyId = this.getRecipebyId.bind(this);
        this.getPublicRecipesbyGroupId = this.getPublicRecipesbyGroupId.bind(this);
        this.addNewRecipe = this.addNewRecipe.bind(this);
        this.updateRecipeById = this.updateRecipeById.bind(this);
        this.deleteRecipeById = this.deleteRecipeById.bind(this);
        this.searchFullText = this.searchFullText.bind(this);
        this.searchPartialText = this.searchPartialText.bind(this);
    }



    /**
     * Get all recipe records
     * @returns {Promise<any>}
     */
    async getAllRecipes () {
        return new Promise((resolve, reject) => {
            RecipeModel.find()
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get all recipe records
     * @returns {Promise<any>}
     */
    async getPublicRecipes () {
        return new Promise((resolve, reject) => {
            RecipeModel.find({isPrivate: false})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get all recipe records of a particular user
     * @returns {Promise<any>}
     */
    async getRecipesByUserId (userId) {
        return new Promise((resolve, reject) => {
            RecipeModel.find({createdBy: userId})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get all recipe records by User Id
     * @params userId
     * @returns {Promise<any>}
     */
    async getAllRecipesByUserId (userId) {
        return new Promise((resolve, reject) => {
            RecipeModel.find({createdBy: userId, isPrivate: true})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get recipe by record id
     * @param id
     * @returns {Promise<any>}
     */
    async getRecipebyId (id) {
        return new Promise((resolve, reject) => {
            RecipeModel.find({_id: id})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get recipe by record id
     * @param id
     * @returns {Promise<any>}
     */
    async getPublicRecipesbyGroupId (id) {
        return new Promise((resolve, reject) => {
            RecipeModel.find({group: id, isPrivate: false})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }



    /**
     * Add new recipe record
     * @param payload { title, link, isPrivate, description, content, html, userId, groupId, tags, items, timers }
     * @param userId
     * @returns {Promise<any>}
     */
    async addNewRecipe (payload) {
        return new Promise((resolve, reject) => {
            const { title, link, isPrivate, userId, content, html, groupId, tags, items, timers } = payload;
            let newRecipeRecord = new RecipeModel({
                title,
                link,
                isPrivate,
                content,
                html,
                createdBy: userId,
                updatedBy: userId,
                group: groupId,
                tags,
                items,
                timers,
            });
            newRecipeRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * Update recipe by its record id
     * @param payload { title, link, description, content, html, userId, groupId, tags, items, timers }
     * @param userId
     * @returns {Promise<any>}
     */
    async updateRecipeById (id, payload) {
        return new Promise((resolve, reject) => {
            const { title, link, isPrivate, content, html, userId, groupId, tags, items, timers, comments } = payload;
            RecipeModel.findOneAndUpdate({_id: id}, {
                title,
                link,
                isPrivate,
                updatedBy: userId,
                content,
                html,
                group: groupId,
                items,
                tags,
                timers,
            }, {new: true}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }


    /**
     * Delete recipe by record id
     * @param id
     * @returns {Promise<any>}
     */
    async deleteRecipeById (id) {
        return new Promise((resolve, reject) => {
            RecipeModel.deleteOne({_id: id}, (err) => {
                if (err) reject(err);
                else resolve(); // Get JSON format of contact
            });
        });
    }

    /**
     * search full text
     * @param text {string} full text query string
     * @returns Promise<any>
     */
    async searchFullText (text) {
        console.log('Calling Full text query: ', text);
        return new Promise((resolve, reject) => {
            RecipeModel.find({$text: {$search: text}})
            .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                })
        });
    }

    /**
     * search partial text
     * @param partial {string} partial query string
     * @returns Promise<any>
     */
    async searchPartialText (partial) {
        return new Promise((resolve, reject) => {
            RecipeModel.find({html: {$regex: new RegExp(partial)}}, {_id:0, __v:0})
            .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('items')
                .populate('timers')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                })
        });
    }

}