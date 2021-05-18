import React from 'react';
import { shallow } from 'enzyme';
import { UutLists } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutLists />);
  expect(renderedComponent.find('.uut-uut-lists').length).toBe(1);
});
