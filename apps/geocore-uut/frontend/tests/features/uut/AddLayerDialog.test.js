import React from 'react';
import { shallow } from 'enzyme';
import { AddLayerDialog } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AddLayerDialog />);
  expect(renderedComponent.find('.uut-add-layer-dialog').length).toBe(1);
});
