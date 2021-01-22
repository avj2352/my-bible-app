/**
 * Main Webservice Routes application
*/

import { AuthController } from '../auth/controllers/auth.controller';
import {GroupController} from "../groups/controllers/group.controller";
import {TagController} from "../tags/controllers/tag.controller";
import {ItemController} from "../items/controllers/item.controller";
import {TimerController} from "../timers/controllers/timer.controller";
import {RecipeController} from "../recipes/controllers/recipe.controller";

const auth = new AuthController();
const group = new GroupController();
const tag = new TagController();
const item = new ItemController();
const timer = new TimerController();
const recipe = new RecipeController();

const routes = (app) => {
    // AUTHENTICATION =======================
    app.route('/auth/google')
        .get(auth.authenticate);
    // Redirect URI
    app.route('/auth/google/callback')
        .get(auth.authCallback);
    // testing OAuth
    app.route('/auth/userDetails')
        .get(auth.userDetails);
    //logout User
    app.route('/auth/logout')
        .get(auth.logoutUser);

    // GROUPS ===============================
    app.route('/groups')
        .get(group.getGroups)
        .post(group.addNewGroup);

    // RUD Groups
    app.route('/groups/:groupId')
        .get(group.getGroupById)
        .put(group.updateGroupById)
        .delete(group.deleteGroupById);
    // search Groups
    app.route('/groups/search/text')
        .get(group.search);

    // TAGS ===============================
    app.route('/tags')
        .get(tag.getTags)
        .post(tag.addNewTag);

    // RUD Tags
    app.route('/tags/:tagId')
        .get(tag.getTagById)
        .put(tag.updateTagById)
        .delete(tag.deleteTagById);
    // search Tags
    app.route('/tags/search/text')
        .get(tag.search);


    // ITEMS ===============================
    app.route('/items')
        .get(item.getItems)
        .post(item.addNewItem);

    // RUD Items
    app.route('/items/:itemId')
        .get(item.getItemById)
        .put(item.updateItemById)
        .delete(item.deleteItemById);
    // search Items
    app.route('/items/search/text')
        .get(item.search);

    // TIMER ===============================
    app.route('/timers')
        .post(timer.addNewTimer);

    // RUD Timers
    app.route('/timers/:timerId')
        .get(timer.getTimerById)
        .delete(timer.deleteTimerById);

    // RECIPE ===============================
    app.route('/recipes')
        .get(recipe.getRecipes)
        .post(recipe.addNewRecipe);

    app.route ('/publicRecipes')
        .get(recipe.getPublicRecipes);
        
    app.route('/recipes/group/:groupId')
        .get(recipe.getRecipeByGroupId);
    // RUD Recipes
    app.route('/recipes/:recipeId')
        .get(recipe.getRecipeById)
        .put(recipe.updateRecipeById)
        .delete(recipe.deleteRecipeById);
    // RUD Recipes by User
    app.route('/recipes/search/user')
        .get(recipe.getRecipesByUserId)
    // search Recipes
    app.route('/recipes/search/text')
        .get(recipe.search);
};


export default routes;