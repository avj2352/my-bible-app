/**
 * CRUD - Controller for Collection Model
 */
require('./../../util/colors');
import { CommentService } from "../services/comment.service";
import { AuthService } from "../../auth/services/auth.service";

export class CommentController {

    constructor() {
        this.logger = 'CommentController';
        this.commentService = new CommentService();
        this.authService = new AuthService();
        // bind context
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getAllComments = this.getAllComments.bind(this);
        this.getCommentsByRecipeId = this.getCommentsByRecipeId.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
        this.updateCommentById = this.updateCommentById.bind(this);
        this.deleteCommentById = this.deleteCommentById.bind(this);
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
     * PAJ - Fetch all Comments created by the user.
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getAllComments (req, res) {
        this.checkAuthentication(req, res);
        try {
            const result = await this.commentService.getAllComments();
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch all comments: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /**
     * PAJ - Fetch record by id.
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getCommentsByRecipeId (req, res) {
        try {
            const result = await this.commentService.getCommentsByRecipeId(req.params.commentId);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Create a new comment record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewComment (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.commentService.addNewComment(req.body, user.id);
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
     * PAJ - Update record by Id. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateCommentById (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.commentService.updateCommentById(req.params.commentId, req.body, user.id);
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
    async deleteCommentById (req, res) {
        const user = this.checkAuthentication(req, res);
        try {
            const result = await this.commentService.deleteCommentById(req.params.commentId, user.id);
            console.log(`${this.logger} - Record deleted: `, result);
            return res.sendStatus(200);
        } catch (err) {
            console.log(`${this.logger} Error updating record: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }
}