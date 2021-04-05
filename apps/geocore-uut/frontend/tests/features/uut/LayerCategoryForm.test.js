import React from 'react';
import { shallow } from 'enzyme';
import { LayerCategoryForm } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerCategoryForm />);
  expect(renderedComponent.find('.uut-layer-category-form').length).toBe(1);
});
