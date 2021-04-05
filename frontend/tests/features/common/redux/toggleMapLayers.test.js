import {
  COMMON_TOGGLE_MAP_LAYERS,
} from '../../../../src/features/common/redux/constants';

import {
  toggleMapLayers,
  reducer,
} from '../../../../src/features/common/redux/toggleMapLayers';

describe('common/redux/toggleMapLayers', () => {
  it('returns correct action by toggleMapLayers', () => {
    expect(toggleMapLayers()).toHaveProperty('type', COMMON_TOGGLE_MAP_LAYERS);
  });

  it('handles action type COMMON_TOGGLE_MAP_LAYERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_TOGGLE_MAP_LAYERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
