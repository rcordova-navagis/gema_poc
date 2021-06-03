import React from 'react';
import { shallow } from 'enzyme';
import { LayerDatatable } from '../../../src/features/layers';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerDatatable />);
  expect(renderedComponent.find('.layers-layer-datatable').length).toBe(1);
});
