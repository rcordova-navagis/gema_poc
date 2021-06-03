import React from 'react';
import { shallow } from 'enzyme';
import { BoundaryHierarchyFilter } from '../../../src/features/boundaries';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<BoundaryHierarchyFilter />);
  expect(renderedComponent.find('.boundaries-boundary-hierarchy-filter').length).toBe(1);
});
