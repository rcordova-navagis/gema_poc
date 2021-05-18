import React from 'react';
import { shallow } from 'enzyme';
import { LayerDetailsUpload } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerDetailsUpload />);
  expect(renderedComponent.find('.uut-layer-details-upload').length).toBe(1);
});
