import React, { FunctionComponent, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
// custom
import { IRecipe } from '../common/recipe-interfaces';
import { useStyles } from './recipe-detail-card.styles';
import SimpleBadge from '../../../components/badges/simple/SimpleBadge';
import ShareButton from '../../../components/buttons/share/ShareButton';
import SmallBadge from '../../../components/badges/simple/SmallBadge';
import YoutubeBadge from '../../../components/badges/media/YoutubeBadge';
import RecipeAccordian from '../../../components/accordians/RecipeAccordian';

interface IRecipeDetailCardProps {
    data: IRecipe;
}

const RecipeDetailCard: FunctionComponent<IRecipeDetailCardProps> = (props): JSX.Element => {
    const { data } = props;
    const { title, link, html, group } = data;
    const date = data.created ? data.created : '';
    const author = data.createdBy ? data.createdBy : null;
    const tags = data.tags? data.tags : [];
    const items = data.items ? data.items : [];
    const timers = data.timers ? data.timers : null;
    const classes = useStyles();

    // event handlers
    const createMarkup = () => {
        return {__html: html};
    };

    const tagContent = tags.length > 0 && tags.map((item: any, index: number) => <SimpleBadge 
        key={index} name={item.name} description={item.description} />);

    
    const groupCard = group.title && <SmallBadge name={group.title} description={group.description} color={'primary'}/>;
    const youtubeButton = link !== '' && <YoutubeBadge link={link}/>

    // useEffect(()=>{console.log('Author details: ', data)});

    return <React.Fragment>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <div className={classes.rowSeparate}>
                    <Typography variant="h5" component="h2">{title.toUpperCase()}</Typography>
                    <ShareButton link={window.location.href}/>
                </div>
                <div className={classes.rowSeparate}>
                    {groupCard}
                    {youtubeButton}
                </div>
                <div className={classes.rowItems}>
                    {tagContent}
                </div>
                <div className={classes.row}>
                    {author && items && <RecipeAccordian date={date} author={author.name} items={items}/>}
                </div>
                <div className={classes.htmlContent} dangerouslySetInnerHTML={createMarkup()}></div>
            </CardContent>
        </Card>
    </React.Fragment>;
};

export default RecipeDetailCard;

