import _ from 'underscore';


export default class CategoriesTransformer
{
    static getChildren(parent, data) {
        return data.filter(item => {
            return item.parent_id === parent.id
        });
    }

    static unflatten(arr) {
        let tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;

        // First map the nodes of the array to an object -> create a hash table.
        for(let i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }

        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    }

    /**
     *  Data parameter is a raw data coming from datasase
     *  Transform it to a hierarchical order (parent -> children)
     */
    static transformDataToHierarchy(arrayData, transformItemFunc) {
        let tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;

        // create a new version of array from transform callback
        if (transformItemFunc && _.isFunction(transformItemFunc)) {
            let _array = arrayData.map(transformItemFunc);
            arrayData = [].concat(_array);
        }

        for(let i=0, len = arrayData.length; i < len; i++) {
            arrElem = arrayData[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }

        for (let id in mappedArr) {
            mappedElem = mappedArr[id];

            if (mappedElem.parent_id) {
                mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
            } else {
                tree.push(mappedElem);
            }
        }

        return tree;
    }

    static transformCategoryDataWithCallback(data, callback) {
        return CategoriesTransformer.transformDataToHierarchy(data, callback);
    }

    static transformToDropdownTreeSelect(data) {
        const transformItem = (item) => {
            item.value = item.id;
            item.label = item.name;
            return item;
        };
        return CategoriesTransformer.transformCategoryDataWithCallback(data, transformItem);
    }
}
