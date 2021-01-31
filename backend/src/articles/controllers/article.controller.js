/**
 * CRUD - Controller for Article Model
 */
require('../../util/colors');
import { ArticleService } from "../services/article.service";
import { AuthService } from "../../auth/services/auth.service";

export class ArticleController {

    constructor() {
        this.logger = 'ArticleController';
        this.articleService = new ArticleService();
        this.authService = new AuthService();
        // bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.getArticles = this.getArticles.bind(this);
        this.getArticlesByUserId = this.getArticlesByUserId.bind(this);
        this.getArticlesByGroupId = this.getArticlesByGroupId.bind(this);
        this.getArticleById = this.getArticleById.bind(this);
        this.addNewArticle = this.addNewArticle.bind(this);
        this.updateArticleById = this.updateArticleById.bind(this);
        this.deleteArticleById = this.deleteArticleById.bind(this);
        this.search = this.search.bind(this);
    }

    /**
     * PAJ - Check Cookie header present
     * @param req
     * @param res
     * @returns boolean
     */
    validatePayload (req) {
        // console.log('Payload is: ', req.body.title,
        //     req.body.link, req.body.content, req.body.html, req.body.group, req.body.tags, req.body.scriptures);
        return !req.body.title || req.body.title === '' ||
            !req.body.hasOwnProperty('link') ||
            !req.body.content || req.body.content === '' ||
            !req.body.html || req.body.html === '' ||
            !req.body.group || req.body.group === '' ||
            !req.body.tags || !Array.isArray(req.body.tags) ||
            !req.body.scriptures || !Array.isArray(req.body.scriptures);
    }

    /**
     * PAJ - Fetch all Articles.
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getArticles (req, res) {
        try {
            const user = this.authService.fetchUserDetails(req);
            if (!Boolean(user)) return res.sendStatus(401);
            const result = await this.articleService.getAllArticles();
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch all articles: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /***
     * PAJ - Get Article By Id
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getArticlesByUserId (req, res) {
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        console.log(`Fetching articles for the user: ${user.id}`.info);
        try {
            const result = await this.articleService.getArticlesByUserId(user.id);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch recipes by user id : ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /***
     * PAJ - Get all Articles By Group Id
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getArticlesByGroupId (req, res) {
        try {
            console.log(`Fetching Articles by Group Id - ${req.params.groupId}`.info);
            const result = await this.articleService.getArticlesByGroupId(req.params.groupId);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Fetch record by id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getArticleById (req, res) {
        // console.log(`Fetching Article record: ${req.params.id}`.info);
        try {
            const result = await this.articleService.getArticlebyId(req.params.id);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Create a new article record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewArticle (req, res) {
        console.log(`Validating payload`.info);
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.status(400).send('Invalid Payload');
        try {
            const result = await this.articleService.addNewArticle({
                title: req.body.title,
                link: req.body.link ? req.body.link : '',
                userId: req.user.id,
                content: req.body.content,
                html: req.body.html,
                groupId: req.body.group,
                tags: req.body.tags,
                scriptures: req.body.scriptures
            });
            console.log(`${this.logger} - New Record added`, result);
            return res.status(201).send(result._id);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`${this.logger} Duplicate Record: ${JSON.stringify(err)}`.error);
                return res.status(400).send('Duplicate Record');
            } else {
                console.log(`${this.logger} Internal Server error: ${JSON.stringify(err)}`.error);
                return res.sendStatus(500);
            }
        }
    }



    /**
     * PAJ - Update record by Id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateArticleById (req, res) {
        console.log(`${this.logger} - Updating record`.info);
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.status(400).send('Invalid Payload');
        console.log(`${this.logger} - Payload: ${user} - ${JSON.stringify(req.body)}`.info);
        try {
            const result = await this.articleService.updateArticleById( req.params.id, {
                title: req.body.title,
                link: req.body.link ? req.body.link : '',
                userId: req.user.id,
                content: req.body.content,
                html: req.body.html,
                groupId: req.body.group,
                tags: req.body.tags,
                scriptures: req.body.scriptures
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
    async deleteArticleById (req, res) {
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.articleService.deleteArticleById(req.params.id);
            console.log(`${this.logger} - Record deleted: `, result);
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
        // const user = this.authService.fetchUserDetails(req);
        // if (!Boolean(user)) return res.sendStatus(401);
        console.log(`${this.logger} - Search Text: ${JSON.stringify(req.query.text)}`.info);
        if (
            !req.query.text || req.query.text === '' ||
            !req.query.type || req.query.type === ''
        ) return res.sendStatus(400);
        try {
            let result;
            console.log(`${this.logger} - Search Type is: ${req.query.type}`.info);
            if (req.query.type === 'full') {
                result = await this.articleService.searchFullText(req.query.text);
                return res.status(200).send(result);
            } else if (req.query.type === 'partial') {
                result = await this.articleService.searchPartialText(req.query.text);
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