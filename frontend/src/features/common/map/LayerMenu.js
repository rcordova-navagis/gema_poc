import React, { Component } from 'react';
import {Paper, IconButton, Toolbar, Divider, TextField, InputAdornment, Menu, MenuItem} from '@material-ui/core';
import {Layers, Ballot, Search, MoreVert} from '@material-ui/icons';
import Tree, {TreeNode} from 'rc-tree';


const LayerMenuFilter = () => (
    <TextField
        id="dasdasdas"
        className="geocore-map-layer-menu-filter"
        placeholder="Type to filter"
        fullWidth
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            )
        }}
    />
);

const LayerMenuOptions = ({anchorEl, menuItems, handleClose}) => {
    const open = Boolean(anchorEl);

    return (
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
            onClose={handleClose} >
            {
                menuItems.map(label => (<MenuItem onClick={handleClose}>{label}</MenuItem>))
            }
        </Menu>
    );
};

// const CheckboxNode = (props) => {
//   console.log('CheckboxNode props: ',props);
//
//   return (
//       <SelectionControl
//           id="checkbox-read-documentation-page"
//           name="simple-checkboxes[]"
//           label="Open SelectionControl documentation page"
//           type="checkbox"
//           value="documentation"
//       />
//   )
// };

export default class LayerMenu extends Component {

  state = {
      showMenu: false,
      expandedKeys: [],
      checkedKeys: [],
      treeData: [
          {
              key: 'parent-1',
              name: 'Parent 1',
              disableCheckbox: false,
              children: [
                  {
                      key: 'child-1',
                      name: 'Child 1',
                      disableCheckbox: false,
                  },
                  {
                      key: 'child-2',
                      name: 'Child 2',
                      disableCheckbox: false,
                  }
              ]
          },
          {
              key: 'parent-2',
              name: 'Parent 2 (no child)',
              disableCheckbox: false,
          },
      ],
  };

  componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps layermenu: ',nextProps);
      if (Array.isArray(nextProps.layersHierarchy) && nextProps.layersHierarchy.length) {
          this.setState({
                treeData: nextProps.layersHierarchy.map(item => {
                    return {
                        key: item.id,
                        name: item.name,
                        disableCheckbox: false,
                    }
                })
          })
      }
  }

    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys);

      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded chilren keys.
      this.setState({
          expandedKeys,
      });
  }

  onCheck(checkedKeys) {
      console.log('onCheck: ', checkedKeys);

      this.props.toggleMapLayers(checkedKeys);

      this.setState({
          checkedKeys,
      });
  }

  onSelect(selectedKeys, info) {
      console.log('onSelect: ', selectedKeys, info);

      this.setState({
          selectedKeys,
      });
  }

  toggleMenuVisibility () {
      this.setState(state => {
          return {
              showMenu: !state.showMenu,
          }
      });
  }

  setAnchorEl(target) {
      this.setState({
        anchorEl: target
      })
  }

  handleClose() {
      this.setState({
          anchorEl: null
      })
  }

  render() {
    let that = this;

    const renderTree = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode key={item.key}
                              title={item.name}>
                        {renderTree(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode key={item.key}
                             title={item.name}/>;
        });
    };

    if (!this.state.showMenu) {
      return <IconButton onClick={this.toggleMenuVisibility.bind(this)}
                         id="geocore-map-layer-menu-toggle-btn"
                         className="geocore-btn MuiPaper-elevation1"><Layers /></IconButton>
    }

    return (
      <Paper elevation={3}
             id="geocore-map-layer-menu"
             className="geocore-panel">

        <Toolbar className="geocore-map-layer-menu-header">
            <IconButton onClick={this.toggleMenuVisibility.bind(this)}
                        className="geocore-btn"><Ballot /></IconButton>
            <LayerMenuFilter />
            <IconButton
                onClick={e => {
                    that.setAnchorEl(e.currentTarget);
                }}
                className="geocore-btn"><MoreVert /></IconButton>
            <LayerMenuOptions menuItems={['Show All', 'Deselect', 'Maximize']}
                              anchorEl={this.state.anchorEl}
                              handleClose={this.handleClose.bind(this)} />
        </Toolbar>

        <Divider />

        <section className="geocore-map-layer-menu-body">
            {
                this.state.treeData.length
                    ? (
                    <Tree
                        checkable
                        showIcon={false}
                        autoExpandParent={true}
                        onExpand={this.onExpand.bind(this)}
                        onCheck={this.onCheck.bind(this)}
                        onSelect={this.onSelect.bind(this)}
                        expandedKeys={this.state.expandedKeys}
                        checkedKeys={this.state.checkedKeys}
                    >
                        {renderTree(this.state.treeData)}
                    </Tree>
                )
                    : null
            }
        </section>
      </Paper>
    );
  }
}

