import React from 'react';
import { shallow } from 'enzyme';
import { LayerMenu } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LayerMenu />);
  expect(renderedComponent.find('.common-layer-menu').length).toBe(1);
});
