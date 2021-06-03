import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY,
} from './constants';

export function toggleLayerTableVisibility(flag=false) {
  return {
    type: LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY,
    flag: flag,
  };
}

export function useToggleLayerTableVisibility() {
  const dispatch = useDispatch();
  const isLayerTableVisible = useSelector(state => state.layers.isLayerTableVisible);
  const boundAction = useCallback((...params) => dispatch(toggleLayerTableVisibility(...params)), [dispatch]);
  return { isLayerTableVisible, toggleLayerTableVisibility: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case LAYERS_TOGGLE_LAYER_TABLE_VISIBILITY:
      return {
        ...state,
        isLayerTableVisible: action.flag,
      };

    default:
      return state;
  }
}
