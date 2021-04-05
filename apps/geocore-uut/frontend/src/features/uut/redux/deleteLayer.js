import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  UUT_DELETE_LAYER_BEGIN,
  UUT_DELETE_LAYER_SUCCESS,
  UUT_DELETE_LAYER_FAILURE,
  UUT_DELETE_LAYER_DISMISS_ERROR,
} from './constants';
// import {useMutation} from '@apollo/react-hooks';
import {deleteLayerAndDatasets} from "../../../libs/geocore-common/gql";
import {default as apolloClient} from "../../../common/apollo";


export function deleteLayer(layerId, datasetId=null, datasetQueueId=null) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: UUT_DELETE_LAYER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      apolloClient.mutate({mutation: deleteLayerAndDatasets(layerId, datasetId, datasetQueueId)})
          .then((res) => {
            console.log('delete mutate resp: ',res);
            dispatch({
              type: UUT_DELETE_LAYER_SUCCESS,
              data: res,
            });
            resolve(res.data);
          }, (err) => {
            console.log('delete mutate err: ',err);
            dispatch({
              type: UUT_DELETE_LAYER_FAILURE,
              data: { error: err },
            });
            reject(err);
          });
    });

    return promise;
  };
}

export function dismissDeleteLayerError() {
  return {
    type: UUT_DELETE_LAYER_DISMISS_ERROR,
  };
}

export function useDeleteLayer(params) {
  const dispatch = useDispatch();

  const { deleteLayerPending, deleteLayerError } = useSelector(
    state => ({
      deleteLayerPending: state.uut.deleteLayerPending,
      deleteLayerError: state.uut.deleteLayerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deleteLayer(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeleteLayerError());
  }, [dispatch]);

  return {
    deleteLayer: boundAction,
    deleteLayerPending,
    deleteLayerError,
    dismissDeleteLayerError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UUT_DELETE_LAYER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteLayerPending: true,
        deleteLayerError: null,
      };

    case UUT_DELETE_LAYER_SUCCESS:
      // The request is success
      return {
        ...state,
        deleteLayerPending: false,
        deleteLayerError: null,
      };

    case UUT_DELETE_LAYER_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteLayerPending: false,
        deleteLayerError: action.data.error,
      };

    case UUT_DELETE_LAYER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteLayerError: null,
      };

    default:
      return state;
  }
}
