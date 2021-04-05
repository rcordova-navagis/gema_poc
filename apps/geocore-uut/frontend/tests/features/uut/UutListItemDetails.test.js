import React from 'react';
import { shallow } from 'enzyme';
import { UutListItemDetails } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UutListItemDetails />);
  expect(renderedComponent.find('.uut-uut-list-item-details').length).toBe(1);
});
