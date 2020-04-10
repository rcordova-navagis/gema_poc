import React from 'react';
import { shallow } from 'enzyme';
import { IndexPage } from '../../../src/features/home/IndexPage';

describe('home/IndexPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <IndexPage {...props} />
    );

    expect(
      renderedComponent.find('.home-index-page').length
    ).toBe(1);
  });
});
