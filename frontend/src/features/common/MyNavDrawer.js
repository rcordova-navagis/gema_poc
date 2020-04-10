import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Button, FontIcon, ListItem, Drawer, Toolbar} from "react-md";
import UserService from "../authentication/services/UserService";
import {Link} from 'react-router-dom';


const parent = document.getElementById('root');


export class MyNavDrawer extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const menuItems = UserService.getUserMenuItems(null);

    return (
      <div className="common-my-nav-drawer">
        <Drawer
            header={<Toolbar title={null}
                             actions={<Button icon onClick={this.props.actions.toggleNavigationDrawer}>close</Button>}/>}
            visible={this.props.common.showNavDrawer}
            renderNode={parent}
            portal={true}
            navItems={(
                menuItems.map(item => {
                    return <ListItem
                        key={item.name}
                        component={Link}
                        to={item.url}
                        primaryText={item.name}
                        leftIcon={<FontIcon>{item.icon}</FontIcon>}/>
                })
            )}
            drawerType={Drawer.DrawerTypes.TEMPORARY}
        />
      </div>
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
