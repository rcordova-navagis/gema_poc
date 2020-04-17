import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/authentication/Login';

describe('authentication/Login', () => {
  it('renders node with correct class name', () => {
    const props = {
      authentication: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Login {...props} />
    );

    expect(
      renderedComponent.find('.authentication-login').length
    ).toBe(1);
  });
});
