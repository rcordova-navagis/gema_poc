import {
  LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY,
} from '../../../../src/features/layers/redux/constants';

import {
  toggleLayerTableVisibility,
  reducer,
} from '../../../../src/features/layers/redux/toggleLayerTableVisibility';

describe('layers/redux/toggleLayerTableVisibility', () => {
  it('returns correct action by toggleLayerTableVisibility', () => {
    expect(toggleLayerTableVisibility()).toHaveProperty('type', LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY);
  });

  it('handles action type LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
