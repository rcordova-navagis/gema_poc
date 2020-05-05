import {
  UUT_SHOW_LAYER_DETAILS,
} from '../../../../src/features/uut/redux/constants';

import {
  showLayerDetails,
  reducer,
} from '../../../../src/features/uut/redux/showLayerDetails';

describe('uut/redux/showLayerDetails', () => {
  it('returns correct action by showLayerDetails', () => {
    expect(showLayerDetails()).toHaveProperty('type', UUT_SHOW_LAYER_DETAILS);
  });

  it('handles action type UUT_SHOW_LAYER_DETAILS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: UUT_SHOW_LAYER_DETAILS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
