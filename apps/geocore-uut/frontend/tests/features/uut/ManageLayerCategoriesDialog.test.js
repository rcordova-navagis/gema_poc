import React from 'react';
import { shallow } from 'enzyme';
import { ManageLayerCategoriesDialog } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ManageLayerCategoriesDialog />);
  expect(renderedComponent.find('.uut-manage-layer-categories-dialog').length).toBe(1);
});
