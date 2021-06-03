import React from 'react';
import { shallow } from 'enzyme';
import { LayerDetails } from '../../../src/features/layers';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerDetails />);
  expect(renderedComponent.find('.layers-layer-details').length).toBe(1);
});
