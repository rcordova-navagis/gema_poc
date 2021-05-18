import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DATASOURCE_IMPORT_DATASOURCE_BEGIN,
  DATASOURCE_IMPORT_DATASOURCE_SUCCESS,
  DATASOURCE_IMPORT_DATASOURCE_FAILURE,
  DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR,
} from './constants';

export function importDatasource(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DATASOURCE_IMPORT_DATASOURCE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DATASOURCE_IMPORT_DATASOURCE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DATASOURCE_IMPORT_DATASOURCE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissImportDatasourceError() {
  return {
    type: DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR,
  };
}

export function useImportDatasource(params) {
  const dispatch = useDispatch();

  const { importDatasourcePending, importDatasourceError } = useSelector(
    state => ({
      importDatasourcePending: state.datasource.importDatasourcePending,
      importDatasourceError: state.datasource.importDatasourceError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(importDatasource(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissImportDatasourceError());
  }, [dispatch]);

  return {
    importDatasource: boundAction,
    importDatasourcePending,
    importDatasourceError,
    dismissImportDatasourceError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATASOURCE_IMPORT_DATASOURCE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        importDatasourcePending: true,
        importDatasourceError: null,
      };

    case DATASOURCE_IMPORT_DATASOURCE_SUCCESS:
      // The request is success
      return {
        ...state,
        importDatasourcePending: false,
        importDatasourceError: null,
      };

    case DATASOURCE_IMPORT_DATASOURCE_FAILURE:
      // The request is failed
      return {
        ...state,
        importDatasourcePending: false,
        importDatasourceError: action.data.error,
      };

    case DATASOURCE_IMPORT_DATASOURCE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        importDatasourceError: null,
      };

    default:
      return state;
  }
}
