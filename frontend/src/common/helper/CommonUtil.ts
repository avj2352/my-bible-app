/**
 * PAJ - Common reusable functions
 * 
 */

// returns if the url is valid URL or not
export function isValidURL (url: string): boolean {
    return /^(http|https):\/\/[^ "]+$/.test(url);
}