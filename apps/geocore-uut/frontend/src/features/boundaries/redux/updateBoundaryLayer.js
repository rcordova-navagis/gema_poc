import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN,
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS,
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE,
  BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR,
} from './constants';
import ApiService from "../../common/services/ApiService";
import {UUT_SAVE_LAYER_FAILURE, UUT_SAVE_LAYER_SUCCESS} from "../../uut/redux/constants";

export function updateBoundaryLayer(data = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.updateBoundaryLayer(data)
          .then(res => {
            dispatch({
              type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS,
              data: res,
            });
            resolve(res);
          }, err => {
            dispatch({
              type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE,
              data: { error: err },
            });
            reject(err);
          });
    });

    return promise;
  };
}

export function dismissUpdateBoundaryLayerError() {
  return {
    type: BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR,
  };
}

export function useUpdateBoundaryLayer(params) {
  const dispatch = useDispatch();

  const { updateBoundaryLayerPending, updateBoundaryLayerError } = useSelector(
    state => ({
      updateBoundaryLayerPending: state.boundaries.updateBoundaryLayerPending,
      updateBoundaryLayerError: state.boundaries.updateBoundaryLayerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateBoundaryLayer(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateBoundaryLayerError());
  }, [dispatch]);

  return {
    updateBoundaryLayer: boundAction,
    updateBoundaryLayerPending,
    updateBoundaryLayerError,
    dismissUpdateBoundaryLayerError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case BOUNDARIES_UPDATE_BOUNDARY_LAYER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateBoundaryLayerPending: true,
        updateBoundaryLayerError: null,
      };

    case BOUNDARIES_UPDATE_BOUNDARY_LAYER_SUCCESS:
      // The request is success
      return {
        ...state,
        updateBoundaryLayerPending: false,
        updateBoundaryLayerError: null,
      };

    case BOUNDARIES_UPDATE_BOUNDARY_LAYER_FAILURE:
      // The request is failed
      return {
        ...state,
        updateBoundaryLayerPending: false,
        updateBoundaryLayerError: action.data.error,
      };

    case BOUNDARIES_UPDATE_BOUNDARY_LAYER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateBoundaryLayerError: null,
      };

    default:
      return state;
  }
}
