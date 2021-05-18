import React from 'react';
import { shallow } from 'enzyme';
import { LayerCategoryTree } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerCategoryTree />);
  expect(renderedComponent.find('.uut-layer-category-tree').length).toBe(1);
});
