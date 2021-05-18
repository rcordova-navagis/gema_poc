import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  UUT_GET_UUT_LAYERS_BEGIN,
  UUT_GET_UUT_LAYERS_SUCCESS,
  UUT_GET_UUT_LAYERS_FAILURE,
  UUT_GET_UUT_LAYERS_DISMISS_ERROR,
} from '../../../../src/features/uut/redux/constants';

import {
  getUutLayers,
  dismissGetUutLayersError,
  reducer,
} from '../../../../src/features/uut/redux/getUutLayers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('uut/redux/getUutLayers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUutLayers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUutLayers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UUT_GET_UUT_LAYERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', UUT_GET_UUT_LAYERS_SUCCESS);
      });
  });

  it('dispatches failure action when getUutLayers fails', () => {
    const store = mockStore({});

    return store.dispatch(getUutLayers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UUT_GET_UUT_LAYERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', UUT_GET_UUT_LAYERS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetUutLayersError', () => {
    const expectedAction = {
      type: UUT_GET_UUT_LAYERS_DISMISS_ERROR,
    };
    expect(dismissGetUutLayersError()).toEqual(expectedAction);
  });

  it('handles action type UUT_GET_UUT_LAYERS_BEGIN correctly', () => {
    const prevState = { getUutLayersPending: false };
    const state = reducer(
      prevState,
      { type: UUT_GET_UUT_LAYERS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUutLayersPending).toBe(true);
  });

  it('handles action type UUT_GET_UUT_LAYERS_SUCCESS correctly', () => {
    const prevState = { getUutLayersPending: true };
    const state = reducer(
      prevState,
      { type: UUT_GET_UUT_LAYERS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUutLayersPending).toBe(false);
  });

  it('handles action type UUT_GET_UUT_LAYERS_FAILURE correctly', () => {
    const prevState = { getUutLayersPending: true };
    const state = reducer(
      prevState,
      { type: UUT_GET_UUT_LAYERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUutLayersPending).toBe(false);
    expect(state.getUutLayersError).toEqual(expect.anything());
  });

  it('handles action type UUT_GET_UUT_LAYERS_DISMISS_ERROR correctly', () => {
    const prevState = { getUutLayersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: UUT_GET_UUT_LAYERS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUutLayersError).toBe(null);
  });
});

