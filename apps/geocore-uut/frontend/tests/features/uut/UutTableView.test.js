import React from 'react';
import { shallow } from 'enzyme';
import { UutTableView } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutTableView />);
  expect(renderedComponent.find('.uut-uut-table-view').length).toBe(1);
});
