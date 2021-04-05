import React from 'react';
import { shallow } from 'enzyme';
import { UutListToolbar } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutListToolbar />);
  expect(renderedComponent.find('.uut-uut-list-toolbar').length).toBe(1);
});
