import {
  COMMON_SET_MAP_VIEWPORT,
} from '../../../../src/features/common/redux/constants';

import {
  setMapViewport,
  reducer,
} from '../../../../src/features/config/redux/setMapViewport';

describe('common/redux/setMapViewport', () => {
  it('returns correct action by setMapViewport', () => {
    expect(setMapViewport()).toHaveProperty('type', COMMON_SET_MAP_VIEWPORT);
  });

  it('handles action type COMMON_SET_MAP_VIEWPORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_MAP_VIEWPORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
