/*global google*/
import React, {Component, useEffect} from 'react';
import {Paper, IconButton, Toolbar, Divider, TextField, InputAdornment, Menu, MenuItem} from '@material-ui/core';
import {Layers, Ballot, Search, MoreVert} from '@material-ui/icons';
import Tree, {TreeNode} from 'rc-tree';
import {isEmpty} from 'underscore';
import PlaceIcon from '@material-ui/icons/Place';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import {BoundaryHierarchyFilter} from "../../boundaries";
import LayerResolver from "../layers/LayerResolver";
import {useSetMapViewport} from "../../config/redux/setMapViewport";
import {CONFIG} from "../../../config";
import PageviewIcon from '@material-ui/icons/Pageview';
import FindInPageIcon from '@material-ui/icons/FindInPage';

function LayerMenuFilter(props) {
    const {setMapViewport} = useSetMapViewport();

    useEffect(() => {
        if (props.mapLoaded) {
            var input = document.getElementById('geocore-layer-menu-filter-input');
            const autocomplete = new google.maps.places.Autocomplete(input);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                console.log('place.geometry',place.geometry);
                // if (place.geometry.viewport) {
                    // map.fitBounds(place.geometry.viewport);
                let viewport = {
                    zoom: 17,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    pitch: 0,
                    bearing: 0,
                };
                // } else {
                //     map.setCenter(place.geometry.location);
                    // map.setZoom(17);
                // }

                setMapViewport(viewport);
            });
        }
    }, [props.mapLoaded, setMapViewport]);

    return (
        <TextField
            id="geocore-layer-menu-filter-input"
            className="geocore-map-layer-menu-filter"
            placeholder="Search address"
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
}

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
          // {
          //     key: 'parent-1',
          //     name: 'Parent 1',
          //     disableCheckbox: false,
          //     children: [
          //         {
          //             key: 'child-1',
          //             name: 'Child 1',
          //             disableCheckbox: false,
          //         },
          //         {
          //             key: 'child-2',
          //             name: 'Child 2',
          //             disableCheckbox: false,
          //         }
          //     ]
          // },
          // {
          //     key: 'parent-2',
          //     name: 'Parent 2 (no child)',
          //     disableCheckbox: false,
          // },
      ],
  };

  componentWillReceiveProps(nextProps) {
      if (Array.isArray(nextProps.layersHierarchy) && nextProps.layersHierarchy.length) {
          this.setState({
            treeData: nextProps.layersHierarchy
          })
      }


  }

  // componentDidUpdate(nextProps) {
  //     if (nextProps.mapLoaded !== this.props.mapLoaded && this.props.mapLoaded === true) {
  //         var input = document.getElementById('geocore-layer-menu-filter-input');
  //         const autocomplete = new google.maps.places.Autocomplete(input);
  //     }
  // }

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
                              title={item.name}
                    >
                        {renderTree(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode key={item.key}
                             icon={isEmpty(item.dataset) ? <PermMediaIcon/> : <PlaceIcon />}
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

            <LayerMenuFilter mapLoaded={this.props.mapLoaded} />

            <IconButton onClick={this.props.toggleLayerTableVisibility.bind(this, true)}
                        color="primary"
                        className="geocore-btn"><FindInPageIcon /></IconButton>

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

      {
          this.props.boundaryHierarchy
          ? <BoundaryHierarchyFilter boundaryHierarchy={this.props.boundaryHierarchy} />
          : 'Loading Boundaries...'
      }

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

