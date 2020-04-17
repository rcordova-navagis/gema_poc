import React from 'react';
import { shallow } from 'enzyme';
import { MyNavDrawer } from '../../../src/features/common/MyNavDrawer';

describe('common/MyNavDrawer', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MyNavDrawer {...props} />
    );

    expect(
      renderedComponent.find('.common-my-nav-drawer').length
    ).toBe(1);
  });
});
