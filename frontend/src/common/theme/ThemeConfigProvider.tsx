import {createMuiTheme, ThemeOptions} from '@material-ui/core/styles';
import { useGlobalState } from '../context/AppContext';

export const useThemeOptions = () : ThemeOptions => {
    const appContext = useGlobalState();
    // default material theme configuration

    let theme = createMuiTheme({
        palette: {
            type: appContext.theme,
            "common": {
                "black": "#000",
                "white": "#fff"
            },
            "secondary": {
                "light": "rgba(240, 52, 122, 1)",
                "main": "rgba(184, 15, 79, 1)",
                "dark": "rgba(133, 11, 57, 1)",
                "contrastText": "#fff"
            },
            "primary": {
                "light": "rgb(142,202,230)",
                "main": "rgb(33,158,188)",
                "dark": "rgba(21, 101, 121)",
                "contrastText": "#fff"
            },
            "error": {
                "light": "rgba(255, 64, 64, 1)",
                "main": "rgba(217, 54, 54, 1)",
                "dark": "rgba(128, 44, 67, 1)",
                "contrastText": "#fff"
            },
        },
        typography: {
            fontFamily: ['"Montserrat"' , 'sans-serif'].join(','),
            fontSize: 16,
            h5: {
                fontWeight: 500,
                fontSize: 26,
                letterSpacing: 0.5,
            },
        },
        shape: {
            borderRadius: 8,
        },
        props: {
            MuiTab: {
                disableRipple: true,
            },
        },
        mixins: {
            toolbar: {
                minHeight: 48,
            },
        },
    });

    // Overrides, specific to application - Paperbase

    theme = {
        ...theme,
        overrides: {
            MuiButton: {
                label: {
                    textTransform: 'none'
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none'
                    }
                }
            },
            MuiTabs: {
                root: {
                    marginLeft: theme.spacing(1)
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white
                }
            },
            MuiTab: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [
                        theme
                            .breakpoints
                            .up('md')
                        ]: {
                        padding: 0,
                        minWidth: 0
                    }
                }
            },
            MuiIconButton: {
                root: {
                    padding: theme.spacing(1)
                }
            },
            MuiTooltip: {
                tooltip: {
                    borderRadius: 4
                }
            },
            MuiDivider: {
                root: {
                    backgroundColor: '#404854'
                }
            },
            MuiListItemText: {
                primary: {
                    fontWeight: theme.typography.fontWeightMedium
                }
            },
            MuiListItemIcon: {
                root: {
                    color: 'inherit',
                    marginRight: 0,
                    '& svg': {
                        fontSize: 20
                    }
                }
            },
            MuiAvatar: {
                root: {
                    width: 32,
                    height: 32
                }
            },
            MuiInputBase: {
                input: {
                    height: 20,
                }
            }
        }
    };
    return theme;
};