import React, { FunctionComponent } from 'react';
import { Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import { getSubText } from '../../../../common/util/HelperFunctions';

export const useStyles = makeStyles(theme => ({
    column: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        padding: 5,
        paddingRight: 10,
        flexDirection: 'column'
    },
    boldTitle: {
        fontWeight: 'bold',
        marginTop: 5
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
        marginBottom: 5
    },
    cardContent: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    text: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

interface ILetter {
    letter: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | 
    "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | 
    "z" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    value: any[];
}

interface IRecipeCollectionProps {
    list: ILetter[];
    onView: (id: string) => void;
}

const listReducer = (list: ILetter[], data: any) => {
    if (list.length > 0) {
        const temp = list.filter((item: ILetter) => item.letter === data.title?.charAt(0));
        if (temp.length > 0) { temp[0].value.push(data);
        } else {
            list.push({
                letter: data.title?.charAt(0),
                value: [data]
            });
        }
    } else {
        list.push({
            letter: data.title?.charAt(0),
            value: [data]
        });
    }
    return list;
};


export const mapChronologicalList = (list: any[]): ILetter[] => {
    let initialState: ILetter[] = [];
    const result: ILetter[] = list.reduce(listReducer, initialState);
    if (result.length > 0) return result.sort((a: ILetter, b:ILetter) => a.letter.localeCompare(b.letter));
    else return [];
};


export const RecipeCollection: FunctionComponent<IRecipeCollectionProps> = (props): JSX.Element => {
    const { list, onView } = props;
    const classes = useStyles();
    const listContent = (list:ILetter[]):JSX.Element[]  => {
        const content: JSX.Element[] = [];
        list.map((item: ILetter, index: number) => {
            content.push(<Typography key={index} component="h6" className={classes.boldTitle}>
                {item.letter.toUpperCase()}
            </Typography>);
            {item.value.map((recipe: any, index01: number) => {
                return content.push(
                    <Card key={`${index}-${index01}`} className={classes.card}>
                        <CardActionArea onClick={()=>onView(recipe._id)}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.text}>
                                <Typography component="p" variant="subtitle1"><strong>
                                    {recipe.title}
                                    </strong></Typography>
                                <Typography component="p" variant="subtitle2">{getSubText(recipe.content)}</Typography>
                            </div>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
        });
        return content;
    };

    // console.log(`Sorted List is: `, list);
    return <React.Fragment>
        <div className={classes.column}>
            {listContent(list)}
        </div>
        </React.Fragment>;
};