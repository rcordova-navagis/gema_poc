import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_TOGGLE_NAVIGATION_DRAWER,
} from './constants';

export function toggleNavigationDrawer() {
  return {
    type: COMMON_TOGGLE_NAVIGATION_DRAWER,
  };
}

export function useToggleNavigationDrawer() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(toggleNavigationDrawer(...params)), [dispatch]);
  return { toggleNavigationDrawer: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_TOGGLE_NAVIGATION_DRAWER:
      return {
        ...state,
        showNavDrawer: !state.showNavDrawer,
      };

    default:
      return state;
  }
}
