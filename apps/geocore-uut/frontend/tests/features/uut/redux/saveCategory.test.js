import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  UUT_SAVE_CATEGORY_BEGIN,
  UUT_SAVE_CATEGORY_SUCCESS,
  UUT_SAVE_CATEGORY_FAILURE,
  UUT_SAVE_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/uut/redux/constants';

import {
  saveCategory,
  dismissSaveCategoryError,
  reducer,
} from '../../../../src/features/uut/redux/saveCategory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('uut/redux/saveCategory', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveCategory succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveCategory())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UUT_SAVE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', UUT_SAVE_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when saveCategory fails', () => {
    const store = mockStore({});

    return store.dispatch(saveCategory({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UUT_SAVE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', UUT_SAVE_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveCategoryError', () => {
    const expectedAction = {
      type: UUT_SAVE_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissSaveCategoryError()).toEqual(expectedAction);
  });

  it('handles action type UUT_SAVE_CATEGORY_BEGIN correctly', () => {
    const prevState = { saveCategoryPending: false };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveCategoryPending).toBe(true);
  });

  it('handles action type UUT_SAVE_CATEGORY_SUCCESS correctly', () => {
    const prevState = { saveCategoryPending: true };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveCategoryPending).toBe(false);
  });

  it('handles action type UUT_SAVE_CATEGORY_FAILURE correctly', () => {
    const prevState = { saveCategoryPending: true };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveCategoryPending).toBe(false);
    expect(state.saveCategoryError).toEqual(expect.anything());
  });

  it('handles action type UUT_SAVE_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { saveCategoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: UUT_SAVE_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveCategoryError).toBe(null);
  });
});

