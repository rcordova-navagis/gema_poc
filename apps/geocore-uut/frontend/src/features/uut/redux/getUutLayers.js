import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  UUT_GET_UUT_LAYERS_BEGIN,
  UUT_GET_UUT_LAYERS_SUCCESS,
  UUT_GET_UUT_LAYERS_FAILURE,
  UUT_GET_UUT_LAYERS_DISMISS_ERROR,
} from './constants';
import ApiService from "../../common/services/ApiService";

export function getUutLayers(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: UUT_GET_UUT_LAYERS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      ApiService.getUutLayers().then(
        (res) => {

          dispatch({
            type: UUT_GET_UUT_LAYERS_SUCCESS,
            data: res,
          });

          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {

          dispatch({
            type: UUT_GET_UUT_LAYERS_FAILURE,
            data: { error: err },
          });

          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetUutLayersError() {
  return {
    type: UUT_GET_UUT_LAYERS_DISMISS_ERROR,
  };
}

export function useGetUutLayers(params) {
  const dispatch = useDispatch();

  const { getUutLayersPending, getUutLayersError } = useSelector(
    state => ({
      getUutLayersPending: state.uut.getUutLayersPending,
      getUutLayersError: state.uut.getUutLayersError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getUutLayers(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetUutLayersError());
  }, [dispatch]);

  return {
    getUutLayers: boundAction,
    getUutLayersPending,
    getUutLayersError,
    dismissGetUutLayersError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UUT_GET_UUT_LAYERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getUutLayersPending: true,
        getUutLayersError: null,
      };

    case UUT_GET_UUT_LAYERS_SUCCESS:
      // The request is success
      return {
        ...state,
        getUutLayersPending: false,
        getUutLayersError: null,
      };

    case UUT_GET_UUT_LAYERS_FAILURE:
      // The request is failed
      return {
        ...state,
        getUutLayersPending: false,
        getUutLayersError: action.data.error,
      };

    case UUT_GET_UUT_LAYERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getUutLayersError: null,
      };

    default:
      return state;
  }
}
