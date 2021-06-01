import {
  LAYERS_SHOW_LAYER_DETAILS,
} from '../../../../src/features/layers/redux/constants';

import {
  showLayerDetails,
  reducer,
} from '../../../../src/features/layers/redux/showLayerDetails';

describe('layers/redux/showLayerDetails', () => {
  it('returns correct action by showLayerDetails', () => {
    expect(showLayerDetails()).toHaveProperty('type', LAYERS_SHOW_LAYER_DETAILS);
  });

  it('handles action type LAYERS_SHOW_LAYER_DETAILS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LAYERS_SHOW_LAYER_DETAILS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
