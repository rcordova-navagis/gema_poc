import React from 'react';
import { shallow } from 'enzyme';
import { UutDashboard } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutDashboard />);
  expect(renderedComponent.find('.uut-uut-dashboard').length).toBe(1);
});
