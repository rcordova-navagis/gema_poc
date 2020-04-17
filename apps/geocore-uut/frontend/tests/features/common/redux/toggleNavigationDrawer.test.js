import {
  COMMON_TOGGLE_NAVIGATION_DRAWER,
} from '../../../../src/features/common/redux/constants';

import {
  toggleNavigationDrawer,
  reducer,
} from '../../../../src/features/common/redux/toggleNavigationDrawer';

describe('common/redux/toggleNavigationDrawer', () => {
  it('returns correct action by toggleNavigationDrawer', () => {
    expect(toggleNavigationDrawer()).toHaveProperty('type', COMMON_TOGGLE_NAVIGATION_DRAWER);
  });

  it('handles action type COMMON_TOGGLE_NAVIGATION_DRAWER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_TOGGLE_NAVIGATION_DRAWER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
