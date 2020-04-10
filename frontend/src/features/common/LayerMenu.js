import React, { Component } from 'react';
import {Paper, Toolbar, Button, MenuButton, TextField, FontIcon, Divider} from 'react-md';
import Tree, {TreeNode} from 'rc-tree';

const LayerMenuOptions = ({menuItems}) => (
    <MenuButton
        icon
        menuItems={menuItems}
    >
      more_vert
    </MenuButton>
);

const LayerMenuFilter = () => (
    <TextField
        className="geocore-map-layer-menu-filter"
        placeholder="Type to filter"
        type="search"
        leftIcon={<FontIcon>search</FontIcon>}
        fullWidth={true}
    />
);

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
              title: 'Parent 1',
              disableCheckbox: false,
              children: [
                  {
                      key: 'child-1',
                      title: 'Child 1',
                      disableCheckbox: false,
                  },
                  {
                      key: 'child-2',
                      title: 'Child 2',
                      disableCheckbox: false,
                  }
              ]
          },
          {
              key: 'parent-2',
              title: 'Parent 2 (no child)',
              disableCheckbox: false,
          },
      ],
  };

  onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys);

      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded chilren keys.
      this.setState({
          expandedKeys,
      });
  }

  onCheck (checkedKeys) {
    console.log('onCheck: ', checkedKeys);

    this.setState({
        checkedKeys,
    });
  }

  onSelect (selectedKeys, info) {
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

  render() {
    const loop = data => {
      return data.map(item => {
          if (item.children) {
              return (
                  <TreeNode key={item.key}
                            title={item.title}
                  >
                      {loop(item.children)}
                  </TreeNode>
              );
          }

          return <TreeNode key={item.key}
                           title={item.title} />;
      });
    };

    if (!this.state.showMenu) {
      return <Button className="geocore-map-layer-menu-toggle-btn md-paper md-paper--1"
                     onClick={this.toggleMenuVisibility.bind(this)}
                     icon>layers</Button>
    }

    return (
      <Paper id="geocore-map-layer-menu"
             className="geocore-panel">

        <Toolbar
            className="geocore-map-layer-menu-header"
            nav={<Button onClick={this.toggleMenuVisibility.bind(this)} icon>ballot</Button>}
            title={<LayerMenuFilter />}
            actions={<LayerMenuOptions menuItems={['Show All', 'Close', 'Maximize']} />}
        />

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
                          {loop(this.state.treeData)}
                      </Tree>
                  )
                      : null
              }
        </section>
      </Paper>
    );
  }
}
