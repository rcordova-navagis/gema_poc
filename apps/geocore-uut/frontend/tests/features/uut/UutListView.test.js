import React from 'react';
import { shallow } from 'enzyme';
import { UutListView } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutListView />);
  expect(renderedComponent.find('.uut-uut-list-view').length).toBe(1);
});
