import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN,
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS,
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE,
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR,
} from '../../../../src/features/boundaries/redux/constants';

import {
  updateBoundaryLayer,
  dismissUpdateBoundaryLayerError,
  reducer,
} from '../../../../src/features/boundaries/redux/updateBoundaryLayer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('boundaries/redux/updateBoundaryLayer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateBoundaryLayer succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateBoundaryLayer())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN);
        expect(actions[1]).toHaveProperty('type', BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS);
      });
  });

  it('dispatches failure action when updateBoundaryLayer fails', () => {
    const store = mockStore({});

    return store.dispatch(updateBoundaryLayer({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN);
        expect(actions[1]).toHaveProperty('type', BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateBoundaryLayerError', () => {
    const expectedAction = {
      type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR,
    };
    expect(dismissUpdateBoundaryLayerError()).toEqual(expectedAction);
  });

  it('handles action type BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN correctly', () => {
    const prevState = { updateBoundaryLayerPending: false };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateBoundaryLayerPending).toBe(true);
  });

  it('handles action type BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS correctly', () => {
    const prevState = { updateBoundaryLayerPending: true };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateBoundaryLayerPending).toBe(false);
  });

  it('handles action type BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE correctly', () => {
    const prevState = { updateBoundaryLayerPending: true };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateBoundaryLayerPending).toBe(false);
    expect(state.updateBoundaryLayerError).toEqual(expect.anything());
  });

  it('handles action type BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR correctly', () => {
    const prevState = { updateBoundaryLayerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateBoundaryLayerError).toBe(null);
  });
});

