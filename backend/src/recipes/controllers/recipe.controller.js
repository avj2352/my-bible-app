/**
 * CRUD - Controller for Recipe Model
 */
require('./../../util/colors');
import { RecipeService } from "../services/recipe.service";
import { AuthService } from "../../auth/services/auth.service";

export class RecipeController {

    constructor() {
        this.logger = 'RecipeController';
        this.recipeService = new RecipeService();
        this.authService = new AuthService();
        // bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
        this.getPublicRecipes = this.getPublicRecipes.bind(this);
        this.getRecipesByUserId = this.getRecipesByUserId.bind(this);
        this.getRecipeById = this.getRecipeById.bind(this);
        this.addNewRecipe = this.addNewRecipe.bind(this);
        this.updateRecipeById = this.updateRecipeById.bind(this);
        this.deleteRecipeById = this.deleteRecipeById.bind(this);
        this.getRecipeByGroupId = this.getRecipeByGroupId.bind(this);
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
        //     req.body.isPrivate, req.body.content, req.body.group, req.body.tags, req.body.items, req.body.timers);
        return !req.body.title || req.body.title === '' ||
            !req.body.hasOwnProperty('isPrivate') ||
            !req.body.hasOwnProperty('link') ||
            !req.body.content || req.body.content === '' ||
            !req.body.html || req.body.html === '' ||
            !req.body.group || req.body.group === '' ||
            !req.body.tags || !Array.isArray(req.body.tags) ||
            !req.body.items || !Array.isArray(req.body.items) ||
            !req.body.timers || !Array.isArray(req.body.timers);
    }

    /**
     * PAJ - Fetch all Recipes.
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getRecipes (req, res) {
        try {
            const user = this.authService.fetchUserDetails(req);
            if (user) {
                console.log(`User logged in, Fetching all recipes`.info);
                const result = await this.recipeService.getAllRecipes();
                return res.json(result);
            } else {
                console.log(`Fetching all public recipes`.info);
                const result = await this.recipeService.getPublicRecipes();
                return res.json(result);
            }
        } catch (err) {
            console.log(`${this.logger} error fetch all recipes: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /**
     * PAJ - Fetch only public recipes
     * @param req 
     * @param res 
     */
    async getPublicRecipes (req, res) {
        try {
            console.log(`Fetching all public recipes`.info);
            const result = await this.recipeService.getPublicRecipes();
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch all recipes: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /***
     * PAJ - Get Recipe By Id
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getRecipesByUserId (req, res) {
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        console.log(`Fetching recipes for the user: ${user.id}`.info);
        try {
            const result = await this.recipeService.getRecipesByUserId(user.id);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} error fetch recipes by user id : ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /***
     * PAJ - Get Recipe By Group Id
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async getRecipeByGroupId (req, res) {
        try {
            console.log(`Fetching all public recipes`.info);
            const result = await this.recipeService.getPublicRecipesbyGroupId(req.params.groupId);
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
    async getRecipeById (req, res) {
        // console.log(`Fetching Recipe record: ${req.params.recipeId}`.info);
        try {
            const result = await this.recipeService.getRecipebyId(req.params.recipeId);
            return res.json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

    /**
     * PAJ - Create a new recipe record. Requires Cookie Session
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    async addNewRecipe (req, res) {
        console.log(`Validating payload`.info);
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.status(400).send('Invalid Payload');
        try {
            const result = await this.recipeService.addNewRecipe({
                title: req.body.title,
                link: req.body.link ? req.body.link : '',
                isPrivate: req.body.isPrivate,
                userId: req.user.id,
                content: req.body.content,
                html: req.body.html,
                groupId: req.body.group,
                tags: req.body.tags,
                items: req.body.items,
                timers: req.body.timers
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
    async updateRecipeById (req, res) {
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        if (this.validatePayload(req)) return res.status(400).send('Invalid Payload');
        try {
            const result = await this.recipeService.updateRecipeById( req.params.recipeId, {
                title: req.body.title,
                link: req.body.link ? req.body.link : '',
                isPrivate: req.body.isPrivate,
                userId: req.user.id,
                content: req.body.content,
                html: req.body.html,
                groupId: req.body.group,
                tags: req.body.tags,
                items: req.body.items,
                timers: req.body.timers
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
    async deleteRecipeById (req, res) {
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.recipeService.deleteRecipeById(req.params.recipeId);
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
                result = await this.recipeService.searchFullText(req.query.text);
                return res.status(200).send(result);
            } else if (req.query.type === 'partial') {
                result = await this.recipeService.searchPartialText(req.query.text);
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