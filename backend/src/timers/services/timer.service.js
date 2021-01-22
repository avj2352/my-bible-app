require('./../../util/colors');
import { TimerModel } from '../models/timer.model';

export class TimerService {
    constructor() {
        this.logger = `TimerService`;
        // bind context
        this.addNewTimer = this.addNewTimer.bind(this);
        this.getTimerById = this.getTimerById.bind(this);
        this.deleteTimerById = this.deleteTimerById.bind(this);
    }


    /**
     * Create a new record
     * @param payload { description, timerType, time }
     * @returns Promise<any>
     */
    async addNewTimer (payload) {
        return new Promise((resolve, reject) => {
            const { description, timerType, time } = payload;
            let newRecord = new TimerModel({ description, timerType, time });
            newRecord.save((err, data) => {
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
    async getTimerById (id) {
        return new Promise((resolve, reject) => {
            TimerModel.find({_id: id}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }


    /**
     * delete group record details by its Id
     * @param id { string }
     * @returns Promise<any>
     */
    async deleteTimerById (id) {
        return new Promise((resolve, reject) => {
            TimerModel.deleteOne({_id: id}, (err) => {
                if (err) reject(err);
                else resolve(); // Get JSON format of contact
            });
        });
    }

}