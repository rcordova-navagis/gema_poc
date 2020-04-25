import React, {Fragment, useState, useCallback } from 'react';
import {
    Paper,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Typography,
    Menu,
    MenuItem,
    InputBase,
    Divider,
    Button
} from '@material-ui/core';
import { fade, darken, makeStyles } from '@material-ui/core/styles';
import {Layers, Fullscreen, Search, MoreVert, Menu as MenuIcon, Save} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: darken(theme.palette.common.white, 0.05),
        '&:hover': {
            backgroundColor: darken(theme.palette.common.white, 0.05),
        },
        // backgroundColor: theme.palette.common.selected,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const UutListToolbarLayerMenuOptions = ({anchorEl, menuItems, handleClose}) => {
    const open = Boolean(anchorEl);

    return (
        <Menu
            id="uut-list-menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            {
                menuItems.map(item => (<MenuItem onClick={()=>{
                    item.action();
                }}>{item.label}</MenuItem>))
            }
        </Menu>
    );
};


export default function UutListToolbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  return (
    <AppBar position="static"
            color="inherit"
            elevation="0"
            className="uut-uut-list-toolbar">
        <Toolbar className="geocore-toolbar">
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>

            <span style={{flexGrow: 1}}></span>

            <Button
                color="primary"
                size="small"
                onClick={() => {
                    props.setShowAddLayerModal(true);
                }}
                className="uut-toolbar-primary-btn"
            >
                Add Layer
            </Button>

            <IconButton
                edge="start" color="inherit" aria-label="menu"
                onClick={e => {
                    setAnchorEl(e.currentTarget);
                }}
                className="geocore-btn">
                <MoreVert />
            </IconButton>

            <UutListToolbarLayerMenuOptions
                menuItems={[
                    {
                        label: 'Manage Layer Categories',
                        action: props.showManageLayerCategoriesModal
                    },
                    {
                        label: props.isListMaximize ? 'Minimize' : 'Maximize',
                        action: () => {
                            props.setIsListMaximize(!props.isListMaximize);

                            setAnchorEl(null);
                        }
                    }
                ]}
                anchorEl={anchorEl}
                handleClose={() => {
                    setAnchorEl(null);
                }} />
        </Toolbar>
    </AppBar>
  );
};
