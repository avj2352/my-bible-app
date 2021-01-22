/**
 * PAJ - Helper function to get date format in DAY, MMM DD YYYY @ HH:MM
 * @param dateObj Date
 * @returns string
 */
export function formatDate (dateObj: Date): string {
    const hours = dateObj.getHours();
    let mins = dateObj.getMinutes()===0 ? '00': dateObj.getMinutes();
    mins = (typeof(mins) === 'number') && mins < 10 ? `0${mins}` : mins;
    const date = dateObj.toDateString();
    return `${date} @ ${hours} : ${mins}`;
};

/**
 * PAJ - Helper function to get if date selected is valid or not
 * @param type until/since
 * @param dateObj Date
 * @returns boolean true - isValid / false - isNotValid
 */
export function isValidDate (type: boolean, dateObj: Date): boolean {
    // if its the countdown timer
    const currentDate = new Date();
    if (type) {
        return currentDate.getTime() - dateObj.getTime() > 0 ? false : true;
    } else {
        return dateObj.getTime() - currentDate.getTime() > 0 ? false : true;
    }
};

/**
 * PAJ - Helper function to parse date from string
 * @param dateString string
 * @returns Date object
 */
export function dateParser (dateString: string): Date {
    return new Date(parseInt(dateString));
};


/**
 * PAJ - Helper function parse date is - until / since
 * @param type string
 * @returns boolean
 */
export function parseTimerType (type: string): boolean {
    return  type === 'until' ? true : false;
};