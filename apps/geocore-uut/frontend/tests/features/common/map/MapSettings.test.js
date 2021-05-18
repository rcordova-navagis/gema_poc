import React from 'react';
import { shallow } from 'enzyme';
import { MapSettings } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MapSettings />);
  expect(renderedComponent.find('.common-map-settings').length).toBe(1);
});
