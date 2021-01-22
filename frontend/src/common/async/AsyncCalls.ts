import axios from 'axios';
import {ISearch} from "../../components/search/search-interface";

// COMMON API =====================================
/**
 * Search tables by Text - partial | full
 * @param data ISearch
 */

export const searchByText = async(data: ISearch) => {
    const { table, type, query } = data;
    return axios.get(`/${table}/search/text?type=${type}&text=${query}`);
};


// AUTHENTICATION =====================================
/**
 * AUTH - Login request for user
 */
export const authenticateUser = async () => {
    return axios.get('/auth/google');
};

export const getUserDetails = async () => {
  return axios.get('/auth/userDetails');
};

export const logoutUser = async () => {
    return axios.get('/auth/logout');
};

// GROUPS RELATED =====================================

/**
 * Add a New Group
 * @param payload
 */
export const addGroupDetails = async (payload: any) => {
  return axios.post('/groups', payload);
};

/**
 * Get a list of all Groups
 */
export const getAllGroups = async () => {
    return axios.get('/groups');
};

/**
 * Get a list of all Filtered (w/o premium) Groups
 */
export const getAllFilteredGroups = async () => {
    return axios.get('/groups?q=filtered');
};

/**
 * Get group details by Id
 * @param id
 */
export const getGroupDetailsById = async (id: string) => {
    return axios.get(`/groups/${id}`);
};

/**
 * Update record by its id
 * @param id
 * @param payload
 */
export const updateGroupById = async (id: string, payload: any) => {
    return axios.put(`/groups/${id}`, payload);
};

/**
 * Delete a Group by Id
 * @param id
 */
export const deleteGroupById = async(id: string) => {
    return axios.delete(`/groups/${id}`);
};

// TAGS RELATED =====================================

/**
 * Add a New Record
 * @param payload
 */
export const addTagDetails = async (payload: any) => {
    return axios.post('/tags', payload);
};

/**
 * Get a list of all records
 */
export const getAllTags = async () => {
    return axios.get('/tags');
};

/**
 * Get record details by Id
 * @param id
 */
export const getTagDetailsById = async (id: string) => {
    return axios.get(`/tags/${id}`);
};

/**
 * Update record by its id
 * @param id
 * @param payload
 */
export const updateTagById = async (id: string, payload: any) => {
    return axios.put(`/tags/${id}`, payload);
};

/**
 * Delete a record by Id
 * @param id
 */
export const deleteTagById = async(id: string) => {
    return axios.delete(`/tags/${id}`);
};


// ITEMS RELATED =========================================

/**
 * Add a New Item
 * @param payload
 */
export const addNewItem = async (payload: any) => {
    return axios.post('/items', payload);
};

/**
 * Get a list of all records
 */
export const getAllItems = async () => {
    return axios.get('/items');
};

/**
 * Update record by its id
 * @param id
 * @param payload
 */
export const updateItemById = async (id: string, payload: any) => {
    return axios.put(`/items/${id}`, payload);
};

/**
 * Delete a record by Id
 * @param id
 */
export const deleteItemById = async(id: string) => {
    return axios.delete(`/items/${id}`);
};

// RECIPE RELATED =========================================


/**
 * Get a list of all records
 */
export const getAllRecipes = async () => {
    return axios.get('/recipes');
};


/**
 * Get a list of all public records
 */
export const getAllPublicRecipes = async () => {
    return axios.get('/publicRecipes');
};



/**
 * Get a list of all records
 */
export const getAllRecipesByUserId = async () => {
    return axios.get('/recipes/search/user');
};

/**
 * Get a list of all records under particular Group
 */
export const getAllRecipesByGroupId = async (id: string) => {
    return axios.get(`/recipes/group/${id}`);
};

/**
 * Get record details by its Id
 */
export const getRecipeById = async (id: string) => {
    return axios.get(`/recipes/${id}`);
};

/**
 * Add a New Item
 * @param payload
 */
export const addNewRecipe = async (payload: any) => {
    return axios.post('/recipes', payload);
};

/**
 * Update record by its id
 * @param id
 * @param payload
 */
export const updateRecipeById = async (id: string, payload: any) => {
    return axios.put(`/recipes/${id}`, payload);
};

/**
 * delete record details by its Id
 */
export const deleteRecipeById = async (id: string) => {
    return axios.delete(`/recipes/${id}`);
};