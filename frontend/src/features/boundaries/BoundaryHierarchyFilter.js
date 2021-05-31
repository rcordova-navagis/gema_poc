import React, { useEffect, useState } from 'react';
import Tree, {TreeNode} from 'rc-tree';


let key;

export default function BoundaryHierarchyFilter(props) {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    setExpandedKeys(expandedKeys);
  };

  const onCheck = (checkedKeys) => {
    console.log('onCheck: ', checkedKeys);
    // this.props.toggleMapLayers(checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect: ', selectedKeys, info);
    // this.setState({
    //   selectedKeys,
    // });
  };

  const renderTree = data => {
      return data.map(item => {
          key = `${item.psgc_ph}-${item.id}`
          if (item.children && item.children.length) {
              return (
                  <TreeNode key={key} title={item.name}>
                      {renderTree(item.children)}
                  </TreeNode>
              );
          }

          return <TreeNode key={key} title={item.name}/>;
      });
  };

  return (
    <div className="boundaries-boundary-hierarchy-filter">
      <Tree checkable
            showIcon={false}
            autoExpandParent={true}
            onExpand={onExpand}
            onCheck={onCheck}
            onSelect={onSelect}
            expandedKeys={expandedKeys}
            checkedKeys={checkedKeys}>
          {renderTree(props.boundaryHierarchy)}
      </Tree>
    </div>
  );
};

