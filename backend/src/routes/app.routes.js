/**
 * Main Webservice Routes application
*/

import { AuthController } from '../auth/controllers/auth.controller';
import {GroupController} from "../groups/controllers/group.controller";
import {TagController} from "../tags/controllers/tag.controller";
import {ScriptureController} from "../scriptures/controllers/scripture.controller";
import {TimerController} from "../timers/controllers/timer.controller";
import {ArticleController} from "../articles/controllers/article.controller";

const auth = new AuthController();
const group = new GroupController();
const tag = new TagController();
const scripture = new ScriptureController();
const timer = new TimerController();
const article = new ArticleController();

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
    app.route('/groups/:id')
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
    app.route('/tags/:id')
        .get(tag.getTagById)
        .put(tag.updateTagById)
        .delete(tag.deleteTagById);
    // search Tags
    app.route('/tags/search/text')
        .get(tag.search);


    // SCRIPTURES ===============================
    app.route('/scriptures')
        .get(scripture.getScriptures)
        .post(scripture.addNewScripture);

    // RUD Scriptures
    app.route('/scriptures/:id')
        .get(scripture.getScriptureById)
        .put(scripture.updateScriptureById)
        .delete(scripture.deleteScriptureById);
    // search Scriptures
    app.route('/scriptures/search/text')
        .get(scripture.search);

    // TIMER ===============================
    app.route('/timers')
        .post(timer.addNewTimer);

    // RUD Timers
    app.route('/timers/:id')
        .get(timer.getTimerById)
        .delete(timer.deleteTimerById);

    // ARTICLES ===============================
    app.route('/articles')
        .get(article.getArticlesByUserId)
        .post(article.addNewArticle);
    
    app.route('/articles/group/:id')
        .get(article.getArticleByGroupId);
    
        // RUD Articles
    app.route('/articles/:id')
        .get(article.getArticleById)
        .put(article.updateArticleById)
        .delete(article.deleteArticleById);

    // Admin related   
    app.route('/articles/search/admin')
        .get(article.getArticles);

    // search Articles
    app.route('/articles/search/text')
        .get(article.search);
};


export default routes;