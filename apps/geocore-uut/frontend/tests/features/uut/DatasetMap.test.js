import React from 'react';
import { shallow } from 'enzyme';
import { DatasetMap } from '../../../src/features/uut';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DatasetMap />);
  expect(renderedComponent.find('.uut-dataset-map').length).toBe(1);
});
