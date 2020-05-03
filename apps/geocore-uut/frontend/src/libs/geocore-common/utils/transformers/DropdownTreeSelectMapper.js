const updateSelectedNode = (child, selectedId) => {
    if (selectedId && child.id === selectedId) {
        child.checked = true;
    } else {
        child.checked = false;
    }
    return child;
};

export const updateTreeNode = (tree, selectedId = null) => {
    tree.forEach(child => {
        if (Array.isArray(child.children) && child.children.length) {
            updateSelectedNode(child, selectedId);

            updateTreeNode(child.children, selectedId);
        } else {
            updateSelectedNode(child, selectedId);
        }
    });

    return tree;
};