import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  UUT_SAVE_LAYER_BEGIN,
  UUT_SAVE_LAYER_SUCCESS,
  UUT_SAVE_LAYER_FAILURE,
  UUT_SAVE_LAYER_DISMISS_ERROR,
} from '../../../../src/features/uut/redux/constants';

import {
  saveLayer,
  dismissSaveLayerError,
  reducer,
} from '../../../../src/features/uut/redux/saveLayer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('uut/redux/saveLayer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveLayer succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveLayer())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UUT_SAVE_LAYER_BEGIN);
        expect(actions[1]).toHaveProperty('type', UUT_SAVE_LAYER_SUCCESS);
      });
  });

  it('dispatches failure action when saveLayer fails', () => {
    const store = mockStore({});

    return store.dispatch(saveLayer({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UUT_SAVE_LAYER_BEGIN);
        expect(actions[1]).toHaveProperty('type', UUT_SAVE_LAYER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveLayerError', () => {
    const expectedAction = {
      type: UUT_SAVE_LAYER_DISMISS_ERROR,
    };
    expect(dismissSaveLayerError()).toEqual(expectedAction);
  });

  it('handles action type UUT_SAVE_LAYER_BEGIN correctly', () => {
    const prevState = { saveLayerPending: false };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_LAYER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveLayerPending).toBe(true);
  });

  it('handles action type UUT_SAVE_LAYER_SUCCESS correctly', () => {
    const prevState = { saveLayerPending: true };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_LAYER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveLayerPending).toBe(false);
  });

  it('handles action type UUT_SAVE_LAYER_FAILURE correctly', () => {
    const prevState = { saveLayerPending: true };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_LAYER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveLayerPending).toBe(false);
    expect(state.saveLayerError).toEqual(expect.anything());
  });

  it('handles action type UUT_SAVE_LAYER_DISMISS_ERROR correctly', () => {
    const prevState = { saveLayerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_LAYER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveLayerError).toBe(null);
  });
});

