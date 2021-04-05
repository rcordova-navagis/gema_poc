import React, { useState, useEffect } from 'react';
import Tree, {TreeNode} from 'rc-tree';
import {isEmpty} from 'underscore';


const renderTree = data => {
    return data.map(item => {
        if (item.children) {
            return (
                <TreeNode key={item.id}
                          title={item.name}>
                    {renderTree(item.children)}
                </TreeNode>
            );
        }

        return <TreeNode key={item.id}
                         title={item.name}/>;
    });
};


export default function LayerCategoryTree(props) {
  const _categories = props.categories;
  const [categories, setCategories] = useState([]);

  const onDrop = info => {
      console.log('onDrop: ',info);
  };

  useEffect(() => {
      if (!isEmpty(_categories)) {
          setCategories(_categories);
      }
  }, [_categories]);

  return (
    <div className="uut-layer-category-tree">
      {
          Array.isArray(categories) && categories.length
          ?  <Tree defaultExpandAll={true}
                  selectable={false}
                  checkable={false}
                  showIcon={false}
                  draggable={true}
                  onDrop={onDrop}
              >
                  {renderTree(categories)}
              </Tree>
          : null
      }
    </div>
  );
};


