/**
 * PAJ - Article Service Layer
 * */
require('../../util/colors');
import { ArticleModel } from '../models/article.model';

export class ArticleService {
    constructor() {
        this.logger = 'ArticleService';
        //bind context   
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticlesByUserId = this.getArticlesByUserId.bind(this);
        this.getArticlesByGroupId = this.getArticlesByGroupId.bind(this);
        this.getArticlebyId = this.getArticlebyId.bind(this);        
        this.addNewArticle = this.addNewArticle.bind(this);
        this.updateArticleById = this.updateArticleById.bind(this);
        this.deleteArticleById = this.deleteArticleById.bind(this);
        this.searchFullText = this.searchFullText.bind(this);
        this.searchPartialText = this.searchPartialText.bind(this);
    }


    /**
     * Get all article records
     * @returns {Promise<any>}
     */
    async getAllArticles () {
        return new Promise((resolve, reject) => {
            ArticleModel.find()
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('scriptures')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

   
    /**
     * Get all article records of a particular user
     * @returns {Promise<any>}
     */
    async getArticlesByUserId (userId) {
        return new Promise((resolve, reject) => {
            ArticleModel.find({createdBy: userId})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('scriptures')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get all article records of a particular group
     * @returns {Promise<any>}
     */
    async getArticlesByGroupId (groupId) {
        return new Promise((resolve, reject) => {
            ArticleModel.find({group: groupId})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('scriptures')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    /**
     * Get article by record id
     * @param id
     * @returns {Promise<any>}
     */
    async getArticlebyId (id) {
        return new Promise((resolve, reject) => {
            ArticleModel.find({_id: id})
                .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('scriptures')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }

    
    /**
     * Add new article record
     * @param payload { title, link, content, html, userId, groupId, tags, scriptures }
     * @param userId
     * @returns {Promise<any>}
     */
    async addNewArticle (payload) {
        return new Promise((resolve, reject) => {
            const { title, link, content, html, userId, groupId, tags, scriptures } = payload;
            let newArticleRecord = new ArticleModel({
                title,
                link,
                content,
                html,
                createdBy: userId,
                updatedBy: userId,
                group: groupId,
                tags,
                scriptures
            });
            newArticleRecord.save((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * Update Article by its record id
     * @param payload { title, link, description, content, html, userId, groupId, tags, items, timers }
     * @param userId
     * @returns {Promise<any>}
     */
    async updateArticleById (id, payload) {
        return new Promise((resolve, reject) => {
            const { title, link, content, html, userId, groupId, tags, scriptures } = payload;
            ArticleModel.findOneAndUpdate({_id: id}, {
                title,
                link,
                content,
                html,
                createdBy: userId,
                updatedBy: userId,
                group: groupId,
                tags,
                scriptures
            }, {new: true}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }


    /**
     * Delete Article by record id
     * @param id
     * @returns {Promise<any>}
     */
    async deleteArticleById (id) {
        return new Promise((resolve, reject) => {
            ArticleModel.deleteOne({_id: id}, (err) => {
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
            ArticleModel.find({$text: {$search: text}})
            .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('scriptures')
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
            ArticleModel.find({html: {$regex: new RegExp(partial)}}, {_id:0, __v:0})
            .lean().populate('createdBy', 'name email')
                .lean().populate('updatedBy', 'name email')
                .populate('group')
                .populate('tags')
                .populate('scriptures')
                .exec((err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                })
        });
    }

}