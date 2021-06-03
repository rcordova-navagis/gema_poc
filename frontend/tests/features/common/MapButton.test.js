import React from 'react';
import { shallow } from 'enzyme';
import { MapButton } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MapButton />);
  expect(renderedComponent.find('.common-map-button').length).toBe(1);
});
