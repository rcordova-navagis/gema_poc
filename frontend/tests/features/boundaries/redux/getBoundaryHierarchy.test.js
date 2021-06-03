import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN,
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS,
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE,
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR,
} from '../../../../src/features/boundaries/redux/constants';

import {
  getBoundaryHierarchy,
  dismissGetBoundaryHierarchyError,
  reducer,
} from '../../../../src/features/boundaries/redux/getBoundaryHierarchy';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('boundaries/redux/getBoundaryHierarchy', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getBoundaryHierarchy succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getBoundaryHierarchy())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN);
        expect(actions[1]).toHaveProperty('type', BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS);
      });
  });

  it('dispatches failure action when getBoundaryHierarchy fails', () => {
    const store = mockStore({});

    return store.dispatch(getBoundaryHierarchy({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN);
        expect(actions[1]).toHaveProperty('type', BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetBoundaryHierarchyError', () => {
    const expectedAction = {
      type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR,
    };
    expect(dismissGetBoundaryHierarchyError()).toEqual(expectedAction);
  });

  it('handles action type BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN correctly', () => {
    const prevState = { getBoundaryHierarchyPending: false };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBoundaryHierarchyPending).toBe(true);
  });

  it('handles action type BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS correctly', () => {
    const prevState = { getBoundaryHierarchyPending: true };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBoundaryHierarchyPending).toBe(false);
  });

  it('handles action type BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE correctly', () => {
    const prevState = { getBoundaryHierarchyPending: true };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBoundaryHierarchyPending).toBe(false);
    expect(state.getBoundaryHierarchyError).toEqual(expect.anything());
  });

  it('handles action type BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR correctly', () => {
    const prevState = { getBoundaryHierarchyError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBoundaryHierarchyError).toBe(null);
  });
});

