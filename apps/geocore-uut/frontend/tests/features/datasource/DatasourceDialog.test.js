import React from 'react';
import { shallow } from 'enzyme';
import { DatasourceDialog } from '../../../src/features/datasource';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DatasourceDialog />);
  expect(renderedComponent.find('.datasource-datasource-dialog').length).toBe(1);
});
