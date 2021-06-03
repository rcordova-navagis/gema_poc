import React from 'react';
import { shallow } from 'enzyme';
import { UpdateBoundaryLayerDialog } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UpdateBoundaryLayerDialog />);
  expect(renderedComponent.find('.uut-update-boundary-layer-dialog').length).toBe(1);
});
