import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DATASOURCE_IMPORT_DATASOURCE_BEGIN,
  DATASOURCE_IMPORT_DATASOURCE_SUCCESS,
  DATASOURCE_IMPORT_DATASOURCE_FAILURE,
  DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR,
} from '../../../../src/features/datasource/redux/constants';

import {
  importDatasource,
  dismissImportDatasourceError,
  reducer,
} from '../../../../src/features/datasource/redux/importDatasource';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('datasource/redux/importDatasource', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when importDatasource succeeds', () => {
    const store = mockStore({});

    return store.dispatch(importDatasource())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DATASOURCE_IMPORT_DATASOURCE_BEGIN);
        expect(actions[1]).toHaveProperty('type', DATASOURCE_IMPORT_DATASOURCE_SUCCESS);
      });
  });

  it('dispatches failure action when importDatasource fails', () => {
    const store = mockStore({});

    return store.dispatch(importDatasource({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DATASOURCE_IMPORT_DATASOURCE_BEGIN);
        expect(actions[1]).toHaveProperty('type', DATASOURCE_IMPORT_DATASOURCE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissImportDatasourceError', () => {
    const expectedAction = {
      type: DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR,
    };
    expect(dismissImportDatasourceError()).toEqual(expectedAction);
  });

  it('handles action type DATASOURCE_IMPORT_DATASOURCE_BEGIN correctly', () => {
    const prevState = { importDatasourcePending: false };
    const state = reducer(
      prevState,
      { type: DATASOURCE_IMPORT_DATASOURCE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.importDatasourcePending).toBe(true);
  });

  it('handles action type DATASOURCE_IMPORT_DATASOURCE_SUCCESS correctly', () => {
    const prevState = { importDatasourcePending: true };
    const state = reducer(
      prevState,
      { type: DATASOURCE_IMPORT_DATASOURCE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.importDatasourcePending).toBe(false);
  });

  it('handles action type DATASOURCE_IMPORT_DATASOURCE_FAILURE correctly', () => {
    const prevState = { importDatasourcePending: true };
    const state = reducer(
      prevState,
      { type: DATASOURCE_IMPORT_DATASOURCE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.importDatasourcePending).toBe(false);
    expect(state.importDatasourceError).toEqual(expect.anything());
  });

  it('handles action type DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR correctly', () => {
    const prevState = { importDatasourceError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.importDatasourceError).toBe(null);
  });
});

