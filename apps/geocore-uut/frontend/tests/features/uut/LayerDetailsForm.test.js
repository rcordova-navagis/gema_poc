import React from 'react';
import { shallow } from 'enzyme';
import { LayerDetailsForm } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerDetailsForm />);
  expect(renderedComponent.find('.uut-layer-details-form').length).toBe(1);
});
