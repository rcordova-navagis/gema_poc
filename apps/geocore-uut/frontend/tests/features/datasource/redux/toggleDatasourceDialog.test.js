import {
  DATASOURCE_TOGGLE_DATASOURCE_DIALOG,
} from '../../../../src/features/datasource/redux/constants';

import {
  toggleDatasourceDialog,
  reducer,
} from '../../../../src/features/datasource/redux/toggleDatasourceDialog';

describe('datasource/redux/toggleDatasourceDialog', () => {
  it('returns correct action by toggleDatasourceDialog', () => {
    expect(toggleDatasourceDialog()).toHaveProperty('type', DATASOURCE_TOGGLE_DATASOURCE_DIALOG);
  });

  it('handles action type DATASOURCE_TOGGLE_DATASOURCE_DIALOG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATASOURCE_TOGGLE_DATASOURCE_DIALOG }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
