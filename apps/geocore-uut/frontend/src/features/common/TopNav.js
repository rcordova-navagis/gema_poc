import React, {Fragment, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleNavigationDrawer} from './redux/actions';
import {switchMapDriver} from './../config/redux/switchMapDriver';
// import {withRouter} from "react-router";
import {AppBar, Toolbar, IconButton, Badge, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import geocoreLogo from '../../images/geocore.png';
import PublicIcon from '@material-ui/icons/Public';
import VpnLockIcon from '@material-ui/icons/VpnLock';


const MyMenu = props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            {/*<IconButton*/}
            {/*    edge="end"*/}
            {/*    aria-label="account of current user"*/}
            {/*    aria-controls="primary-search-account-menu"*/}
            {/*    aria-haspopup="true"*/}
            {/*    onClick={() => props.dispatch(switchMapDriver())}*/}
            {/*    color="inherit" >*/}
            {/*    {*/}
            {/*        props.config.MAP_DRIVER === 'gmap'*/}
            {/*            ? <PublicIcon />*/}
            {/*            : <VpnLockIcon />*/}
            {/*    }*/}
            {/*</IconButton>*/}

            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit" >
                <AccountCircle />
            </IconButton>

            <Menu
                id="menu-appbar"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Fragment>
    );
};

function TopNav (props) {
    const config = useSelector(state => state.config);
    const dispatch = useDispatch();

    return (
        <AppBar position="static"
                className="common-top-nav">
          <Toolbar className="common-top-nav-toolbar">
              <IconButton
                  edge="start"
                  className="menu-btn"
                  onClick={() => dispatch(toggleNavigationDrawer())}
                  color="inherit"
                  aria-label="open drawer">
                  <MenuIcon />
              </IconButton>

              <span className="common-top-nav-brand">
                  <img src={geocoreLogo}
                       alt=""
                       onClick={() => {
                           // props.history.push('/');
                       }}
                  />
              </span>

              <span style={{flexGrow: 1}}></span>

              <MyMenu config={config} dispatch={dispatch} />
          </Toolbar>
        </AppBar>
    );
}

export default TopNav;
