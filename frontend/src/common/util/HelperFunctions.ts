/**
 * Helper function to remove HTML tags surrounding text
 * @param string text
 * @returns string
 */
export const removeHtmlTags = (text: string): string => text.replace(/<\/?[^>]+(>|$)/g, "");

/**
 * Helper function to remove new lines
 * @param string text
 * @returns string
 */
export const removeNewLines = (text: string): string => text.replace(/(\r\n|\n|\r)/gm, " ");

/**
 * Helper function to remove special characters
 * @param string text
 * @returns string
 */
export const removeSpecialCharacters = (text: string): string => text.replace(/&(quot;|nbsp;|gt;|lt;)?/g, "");

/**
 * Helper function to provide a substring, default is 70 characters
 * @param text 
 */
export const getSubText = (text: string, count?:number): string => {
    let len = count? count : 70;
    const result = text.substr(0,len);
    return `${result}...`;
};

/**
 * Helper function to remove special characters
 * @param string text
 * @returns string
 */
export const replaceAmpersand = (text: string): string => text.replace(/&(amp;)?/g, "&");

