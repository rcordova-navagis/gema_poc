import React from 'react';
import { shallow } from 'enzyme';
import { DatasetTable } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DatasetTable />);
  expect(renderedComponent.find('.uut-dataset-table').length).toBe(1);
});
