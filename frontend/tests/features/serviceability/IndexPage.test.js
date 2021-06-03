import React from 'react';
import { shallow } from 'enzyme';
import { IndexPage } from '../../../src/features/serviceability';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<IndexPage />);
  expect(renderedComponent.find('.serviceability-index-page').length).toBe(1);
});
