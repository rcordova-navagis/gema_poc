import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {SwipeableDrawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText, Icon} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import UserService from "../authentication/services/UserService";


export class MyNavDrawer extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const menuItems = UserService.getUserMenuItems(null);

    return (
        <SwipeableDrawer
                variant="persistent"
                anchor="left"
                elevation={3}
                open={this.props.common.showNavDrawer}
                className="common-my-nav-drawer">

          <div className="common-my-nav-drawer-header MuiToolbar-root">
            <IconButton onClick={this.props.actions.toggleNavigationDrawer}>
                <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          <List>
              {menuItems.map(item => (
                  <ListItem button
                            component="a"
                            href={item.url}
                            key={item.name}>
                    <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                    <ListItemText primary={item.name}/>
                  </ListItem>
              ))}
          </List>
        </SwipeableDrawer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNavDrawer);
