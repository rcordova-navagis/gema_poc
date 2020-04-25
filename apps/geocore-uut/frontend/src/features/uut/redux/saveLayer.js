import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  UUT_SAVE_LAYER_BEGIN,
  UUT_SAVE_LAYER_SUCCESS,
  UUT_SAVE_LAYER_FAILURE,
  UUT_SAVE_LAYER_DISMISS_ERROR,
} from './constants';

export function saveLayer(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: UUT_SAVE_LAYER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: UUT_SAVE_LAYER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: UUT_SAVE_LAYER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissSaveLayerError() {
  return {
    type: UUT_SAVE_LAYER_DISMISS_ERROR,
  };
}

export function useSaveLayer(params) {
  const dispatch = useDispatch();

  const { saveLayerPending, saveLayerError } = useSelector(
    state => ({
      saveLayerPending: state.uut.saveLayerPending,
      saveLayerError: state.uut.saveLayerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(saveLayer(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSaveLayerError());
  }, [dispatch]);

  return {
    saveLayer: boundAction,
    saveLayerPending,
    saveLayerError,
    dismissSaveLayerError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UUT_SAVE_LAYER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveLayerPending: true,
        saveLayerError: null,
      };

    case UUT_SAVE_LAYER_SUCCESS:
      // The request is success
      return {
        ...state,
        saveLayerPending: false,
        saveLayerError: null,
      };

    case UUT_SAVE_LAYER_FAILURE:
      // The request is failed
      return {
        ...state,
        saveLayerPending: false,
        saveLayerError: action.data.error,
      };

    case UUT_SAVE_LAYER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveLayerError: null,
      };

    default:
      return state;
  }
}
