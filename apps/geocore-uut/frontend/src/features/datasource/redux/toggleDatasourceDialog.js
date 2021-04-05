import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DATASOURCE_TOGGLE_DATASOURCE_DIALOG,
} from './constants';

export function toggleDatasourceDialog(flag, layerId = null) {
  return {
    type: DATASOURCE_TOGGLE_DATASOURCE_DIALOG,
    showDatasourceDialog: flag,
    layerId: layerId,
  };
}

export function useToggleDatasourceDialog() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(toggleDatasourceDialog(...params)), [dispatch]);
  return { toggleDatasourceDialog: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATASOURCE_TOGGLE_DATASOURCE_DIALOG:
      return {
        ...state,
        currentLayerId: action.layerId,
        showDatasourceDialog: action.showDatasourceDialog,
      };

    default:
      return state;
  }
}
