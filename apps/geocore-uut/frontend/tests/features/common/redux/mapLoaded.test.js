import {
  COMMON_MAP_LOADED,
} from '../../../../src/features/common/redux/constants';

import {
  mapLoaded,
  reducer,
} from '../../../../src/features/common/redux/mapLoaded';

describe('common/redux/mapLoaded', () => {
  it('returns correct action by mapLoaded', () => {
    expect(mapLoaded()).toHaveProperty('type', COMMON_MAP_LOADED);
  });

  it('handles action type COMMON_MAP_LOADED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_MAP_LOADED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
