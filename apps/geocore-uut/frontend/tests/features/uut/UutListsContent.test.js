import React from 'react';
import { shallow } from 'enzyme';
import { UutListsContent } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutListsContent />);
  expect(renderedComponent.find('.uut-uut-lists-content').length).toBe(1);
});
