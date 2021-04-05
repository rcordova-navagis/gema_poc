import React from 'react';
import { shallow } from 'enzyme';
import { TopNav } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TopNav />);
  expect(renderedComponent.find('.common-top-nav').length).toBe(1);
});
