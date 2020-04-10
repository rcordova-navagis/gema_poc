import React, {Fragment, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './redux/actions';
import {withRouter} from "react-router";
import {Toolbar, Button, MenuButton, ListItem, Badge, Avatar, FontIcon} from 'react-md';
import geocoreLogo from '../../images/geocore.png';


const UserMenuItems = (props) => {
    return [
        <ListItem key="1" primaryText={'user1'} onClick={null}/>,
        <ListItem key="2" primaryText="Logout" onClick={null}/>,
    ];
};


const MyMenu = (props) => {
    return (
        <Fragment>
            <Badge badgeContent={props.common.notifications.length} invisibleOnZero secondary badgeId="notifications-1">
                <MenuButton icon
                            anchor={{
                                x: MenuButton.HorizontalAnchors.LEFT,
                                y: MenuButton.VerticalAnchors.BOTTOM,
                            }}
                            simplifiedMenu={false}
                            visible={props.common.notifications.length}
                            menuItems={props.common.notifications.map(item => {
                                return <ListItem
                                    leftAvatar={<Avatar suffix="blue" icon={<FontIcon>local_shipping</FontIcon>}/>}
                                    key={item.id} primaryText={item.message}/>;
                            })}>notifications</MenuButton>
            </Badge>

            <MenuButton
                key="action"
                icon
                anchor={{
                    x: MenuButton.HorizontalAnchors.LEFT,
                    y: MenuButton.VerticalAnchors.BOTTOM,
                }}
                simplifiedMenu={false}
                menuItems={UserMenuItems(props)}>
                account_circle
            </MenuButton>
        </Fragment>
    );
};


class TopNav extends Component {

  render() {
    let that = this;

    return (
      <Toolbar
        colored
        className="common-top-nav"
        nav={(
                <Button
                    key="nav"
                    icon
                    className="menu-btn"
                    onClick={this.props.actions.toggleNavigationDrawer}>menu</Button>
        )}
        titleMenu={(
            <img src={geocoreLogo}
                 alt=""
                 onClick={() => {
                    that.props.history.push('/');
                 }}
            />
        )}
        actions={<MyMenu {...this.props} />} />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        common: state.common
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...actions}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TopNav));

