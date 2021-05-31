import React from 'react';
import { shallow } from 'enzyme';
import { UutLayerDetailsPage } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutLayerDetailsPage />);
  expect(renderedComponent.find('.uut-uut-layer-details-page').length).toBe(1);
});
