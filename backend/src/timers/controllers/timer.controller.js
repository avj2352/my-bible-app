/**
 * CRUD - API Controller for Timer Model
 */

require('./../../util/colors');
import { AuthService } from "../../auth/services/auth.service";
import { TimerService } from "../services/timer.service";

export class TimerController {

    constructor() {
        this.logger = 'Timer Controller';
        this.timerService = new TimerService();
        this.authService = new AuthService();
        //bind context
        this.validatePayload = this.validatePayload.bind(this);
        this.validateTimerType = this.validateTimerType.bind(this);
        this.validateItemRange = this.validateItemRange.bind(this);
        this.validateRecipeRange = this.validateRecipeRange.bind(this);
        this.addNewTimer = this.addNewTimer.bind(this);
        this.getTimerById = this.getTimerById.bind(this);
        this.deleteTimerById = this.deleteTimerById.bind(this);
    }

    /**
     * PAJ - validatePayload Group model
     * @param req
     * @returns boolean
     */
    validatePayload (req) {
        console.log(`${this.logger} - Validating Payload`.info);
        return !req.body.description || req.body.description === '' ||
            !req.body.timerType || req.body.timerType === '' ||
            !req.body.hasOwnProperty('time');
    }

    /**
     * PAJ - validatePayload Group model
     * @param req
     * @returns boolean
     */
    validateTimerType (req) {
        console.log(`${this.logger} - Validating Timer Type`.info);
        return !(['item', 'recipe'].includes(req.body.timerType));
    }

    /**
     * PAJ - validatePayload Group model
     * @param req
     * @returns boolean
     */
    validateItemRange (req) {
        console.log(`${this.logger} - Validating Timer range`.info);
        return (req.body.timerType === 'item' && req.body.time < 1) ||
            (req.body.timerType === 'item' && req.body.time > 30);
    }

    /**
     * PAJ - validatePayload Group model
     * @param req
     * @returns boolean
     */
    validateRecipeRange (req) {
        console.log(`${this.logger} - Validating Timer range`.info);
        return (req.body.timerType === 'recipe' && req.body.time < 1);
    }


    /**
     * PAJ - Create a new record. Requires Cookie Session
     * @param req
     * @param res
     * @returns Promise<any>
     */
    async addNewTimer (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        // check if admin user
        if (this.validatePayload(req)) return res.status(400).send('Invalid payload');
        if (this.validateTimerType(req)) return res.status(400).send('Invalid timer type');
        if (this.validateItemRange(req)) return res.status(400).send('Invalid timer range for item type');
        if (this.validateRecipeRange(req)) return res.status(400).send('Invalid timer range for recipe type');
        try {
            const result = await this.timerService.addNewTimer ({
                description: req.body.description,
                timerType: req.body.timerType,
                time: req.body.time
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
     * PAJ - Fetch record by id. Requires Cookie Session
     * @param req
     * @param res
     * @returns Promise<any>
     */
    async getTimerById (req, res) {
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.timerService.getTimerById(req.params.id);
            return res.status(200).json(result);
        } catch (err) {
            console.log(`${this.logger} Error Retrieving Id: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }



    /**
     * PAJ - Delete record by Id. Requires Cookie Session
     * @param req
     * @param res
     * @returns Promise<any>
     */
    async deleteTimerById (req, res) {
        console.log(`${this.logger} - Delete item ID: ${JSON.stringify(req.params.id)}`.info);
        // check if authenticated
        const user = this.authService.fetchUserDetails(req);
        if (!Boolean(user)) return res.sendStatus(401);
        try {
            const result = await this.timerService.deleteTimerById(req.params.id);
            console.log(`${this.logger} - Record deleted: `, result);
            return res.sendStatus(200);
        } catch (err) {
            console.log(`${this.logger} Error updating record: ${JSON.stringify(err)}`.error);
            return res.sendStatus(400);
        }
    }

}