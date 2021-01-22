import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// custom
import HomeView from "../../../views/home/Home.view";
import GroupView from "../../../views/groups/Group.view";
import {DashboardRouterContextProvider} from "./DashboardRouterContext";
import TagView from "../../../views/tags/Tag.view";
import ItemView from "../../../views/items/Item.view";
import RecipeAddView from '../../../views/recipes/add/RecipeAdd.view';
import RecipeListView from '../../../views/recipes/list/RecipeList.view';
import RecipeUpdateView from '../../../views/recipes/edit/RecipeUpdate.view';
import RecipeSearchView from '../../../views/recipes/search/RecipeSearch.view';
import MyRecipeListView from '../../../views/recipes/profile/MyRecipe.view';
import RecipeDetailView from '../../../views/recipes/detail/RecipeDetail.view';

const DashboardRouterApp: FunctionComponent = () => {
    return (
        <DashboardRouterContextProvider>
            <Router>
                <Switch>
                    <Route strict path="/app/groups" component={GroupView}/>
                    <Route strict path="/app/tags" component={TagView}/>
                    <Route strict path="/app/items" component={ItemView}/>
                    <Route strict path="/app/recipes/add" component={RecipeAddView}/>
                    <Route strict path="/app/recipes/search" component={RecipeSearchView}/>
                    <Route strict path="/app/recipes/profile" component={MyRecipeListView}/>
                    <Route strict path="/app/recipes/list/:id" component={RecipeListView}/>
                    <Route strict path="/app/recipes/update/:id" component={RecipeUpdateView}/>
                    <Route strict path="/app/recipes/detail/:id" component={RecipeDetailView}/>
                    <Route path="/app/" component={HomeView}/>
                </Switch>
            </Router>
        </DashboardRouterContextProvider>
    );
};

export default DashboardRouterApp;