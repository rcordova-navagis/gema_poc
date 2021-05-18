import React from 'react';
import { shallow } from 'enzyme';
import { MapIndex } from '../../../src/features/home/MapIndex';

describe('home/MapIndex', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MapIndex {...props} />
    );

    expect(
      renderedComponent.find('.home-map-index').length
    ).toBe(1);
  });
});
