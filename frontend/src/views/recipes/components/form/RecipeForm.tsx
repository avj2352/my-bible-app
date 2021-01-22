import React, { FunctionComponent, useEffect, useState } from 'react';
// material
import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Card, CardActions, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
// custom
import { IRecipe } from '../../common/recipe-interfaces';
import ClassicEditor from '../../../../components/editor/ClassicEditor';
import { Autocomplete } from '@material-ui/lab';
import { useStyles } from './recipe-form.style';

interface IRecipeForm {
    data: IRecipe;
    groupDropdownList: any[];
    tagDropdownList: any[];
    itemDropdownList: any[];
    onSubmit: (data: IRecipe) => void;
}

const RecipeForm: FunctionComponent<IRecipeForm> = (props):JSX.Element => {
    // props
    const { data, onSubmit, groupDropdownList, tagDropdownList, itemDropdownList } = props;
    const tagsData = data.tags ? data.tags : [];
    const itemsData = data.items ? data.items : [];
    const htmlData = data.html !=='' ? data.html : '<p>Enter your recipe description here**</p>';
    // states
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [recipeTitle, setRecipeTitle] = useState<string>(data.title);
    const [editorData, setEditorData] = useState<{text: string, html: string}>({text: data.content, html: htmlData});
    const [recipeLink, setRecipeLink] = useState(data.link);
    const [selectedGroup, setSelectedGroup] = useState<any | null>(data.group? data.group : null);
    // const [selectedTags, setSelectedTags] = React.useState<any[]>([tagDropdownList[0], tagDropdownList[1]]);
    const [selectedTags, setSelectedTags] = React.useState<any[]>(populateList(tagsData, tagDropdownList));
    const [selectedItems, setSelectedItems] = useState<any[]>(populateList(itemsData, itemDropdownList));
    const [privateValue, setPrivateValue] = useState<any | null>(null);
    const [errMsg, setErrMsg] = useState<string | null>('');
    //classes
    const classes = useStyles();

    // lifecycle methods
    function populateList (propList: any[], optionsList: any[]) {
        if (propList.length == 0) {
            return [];
        } else {
            const filteredList = optionsList.filter((el: any) => {
                return propList.some((item: any) => {
                  return item._id === el._id;
                });
            });
            return filteredList;
        }
    }

    const checkValidYoutubeUrl = (text: string): boolean => {
        return (/^(https?:\/\/)?((www\.)?youtube\.com|youtu\.?be)(\/)?.+$/.test(text)) ? true : false;
    };

    const privacyOptionsList = ():any[] => {
        return [{name: 'is Private', value: true}, {name: 'is Public', value: false}];
    };

    // event handlers
    const handleChange = (event: any) => {
        if (event.target.name === 'title') {
            setRecipeTitle(event.target.value);
        } else if (event.target.name === 'group') {
            setSelectedGroup(event.target.value);
        } else if (event.target.name === 'private') {
            setPrivateValue(event.target.value);
        } else if (event.target.name === 'link') {
            setRecipeLink(event.target.value);
            if (event.target.value !== '' && !checkValidYoutubeUrl(event.target.value)) {
                setErrMsg('Invalid Youtube Link');
            } else {
                setErrMsg('');
            }
        }
    };

    const handleAccordianChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    const handleSubmit = () => {
            onSubmit({
                title: recipeTitle,
                link: recipeLink,
                isPrivate: privateValue.value,
                content: editorData.text,
                html: editorData.html,
                group: selectedGroup,
                tags: selectedTags,
                items: selectedItems,
                timers: []
            });
    };

    const handleEditorChange = (text: string, html: string) => {
        setEditorData({text, html});
    };

    const handleGroupSelect = (event: any, newInputValue: any) => {
        console.log('New Input value is: ', newInputValue);
        setSelectedGroup(newInputValue);
    };

    const handlePrivacySelect = (event: any, newInputValue: any) => {
        setPrivateValue(newInputValue);
    };

    const handleTagSelect = (event: any, newInputValue: any) => {
        setSelectedTags(newInputValue);
    };

    const handleItemSelect = (event: any, newInputValue: any) => {
        setSelectedItems(newInputValue);
    };

    const errorMsgText = () => <Typography className={classes.validationText} component="p">
        {errMsg}
    </Typography>;

    useEffect(()=>{
        if (recipeTitle !== '' && editorData.html !=='' && selectedGroup && privateValue) {
            setErrMsg('');
        } else {
            setErrMsg('Fill all the mandatory fields!');
        }
    },[recipeTitle, editorData, selectedGroup, privateValue]);

    return <React.Fragment>
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        {errorMsgText()}
                        <TextField margin="normal" variant="outlined" required fullWidth id="title" label="Recipe Title" name="title"
                            value={recipeTitle} autoFocus onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete 
                            value={selectedGroup} 
                            id="groups-outlined"
                            onChange={handleGroupSelect}
                            options={groupDropdownList}
                            getOptionLabel={(option)=> option.title}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Select Group*"
                                placeholder="Group" />
                            )}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete 
                            value={privateValue} 
                            id="groups-outlined"
                            onChange={handlePrivacySelect}
                            options={privacyOptionsList()}
                            getOptionLabel={(option)=> option.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Recipe type*"
                                placeholder="Type" />
                            )}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Accordion expanded={expanded==='panel1' } onChange={handleAccordianChange('panel1')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography className={classes.heading}>Additional Info</Typography>
                            <Typography className={classes.secondaryHeading}>These fields are optional.
                                But filling them up, helps in better search results</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid item xs={12} md={12}>
                                <Grid className={classes.autocomplete} item xs={12} md={12}>
                                    <Autocomplete 
                                        value={selectedTags}
                                        multiple 
                                        id="tags-outlined"
                                        onChange={handleTagSelect}
                                        options={tagDropdownList}
                                        getOptionLabel={(option)=> option.name}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Select Tags"
                                            placeholder="Tags" />
                                        )}/>
                                </Grid>
                                <Grid className={classes.autocomplete} item xs={12} md={12}>
                                    <Autocomplete 
                                        value={selectedItems}
                                        multiple 
                                        id="items-outlined"
                                        onChange={handleItemSelect}
                                        options={itemDropdownList}
                                        getOptionLabel={(option)=> option.name}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Select Items"
                                            placeholder="Items" />
                                        )}/>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" margin="normal" fullWidth id="link" label="Youtube Link" name="link"
                                        value={recipeLink} onChange={handleChange} />
                                </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ClassicEditor placeholder={htmlData} onEditorChange={handleEditorChange} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.action}>
                <Button onClick={handleSubmit} disabled={!!errMsg} variant="contained" size="medium"
                    color="primary">Submit</Button>
            </CardActions>
        </Card>
    </React.Fragment>
};

export default RecipeForm;