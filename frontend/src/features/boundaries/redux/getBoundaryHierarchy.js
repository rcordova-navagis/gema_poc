import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN,
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS,
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE,
  BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR,
} from './constants';
import ApiService from "../../common/services/ApiService";

export function getBoundaryHierarchy(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getBoundaryHierarchy().then(
        (res) => {
          dispatch({
            type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS,
            data: [res],
          });
          resolve([res]);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetBoundaryHierarchyError() {
  return {
    type: BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR,
  };
}

export function useGetBoundaryHierarchy(params) {
  const dispatch = useDispatch();

  const { boundaryHierarchy, getBoundaryHierarchyPending, getBoundaryHierarchyError } = useSelector(
    state => ({
      boundaryHierarchy: state.boundaries.boundaryHierarchy,
      getBoundaryHierarchyPending: state.boundaries.getBoundaryHierarchyPending,
      getBoundaryHierarchyError: state.boundaries.getBoundaryHierarchyError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getBoundaryHierarchy(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetBoundaryHierarchyError());
  }, [dispatch]);

  return {
    boundaryHierarchy,
    getBoundaryHierarchy: boundAction,
    getBoundaryHierarchyPending,
    getBoundaryHierarchyError,
    dismissGetBoundaryHierarchyError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case BOUNDARIES_GET_BOUNDARY_HIERARCHY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getBoundaryHierarchyPending: true,
        getBoundaryHierarchyError: null,
      };

    case BOUNDARIES_GET_BOUNDARY_HIERARCHY_SUCCESS:
      // The request is success
      return {
        ...state,
        getBoundaryHierarchyPending: false,
        getBoundaryHierarchyError: null,
        boundaryHierarchy: action.data,
      };

    case BOUNDARIES_GET_BOUNDARY_HIERARCHY_FAILURE:
      // The request is failed
      return {
        ...state,
        getBoundaryHierarchyPending: false,
        getBoundaryHierarchyError: action.data.error,
      };

    case BOUNDARIES_GET_BOUNDARY_HIERARCHY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getBoundaryHierarchyError: null,
      };

    default:
      return state;
  }
}
