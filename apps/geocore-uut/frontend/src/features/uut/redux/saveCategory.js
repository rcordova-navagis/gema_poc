import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  UUT_SAVE_CATEGORY_BEGIN,
  UUT_SAVE_CATEGORY_SUCCESS,
  UUT_SAVE_CATEGORY_FAILURE,
  UUT_SAVE_CATEGORY_DISMISS_ERROR,
} from './constants';
import ApiService from "../../common/services/ApiService";

export function saveCategory(categoryName, parentId = null) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: UUT_SAVE_CATEGORY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.saveLayerCategory(categoryName, parentId)
          .then(res => {
              dispatch({
                type: UUT_SAVE_CATEGORY_SUCCESS,
                data: res,
              });
              resolve(res);
          }, err => {
              dispatch({
                type: UUT_SAVE_CATEGORY_FAILURE,
                data: { error: err },
              });
              reject(err);
          });
    });

    return promise;
  };
}

export function dismissSaveCategoryError() {
  return {
    type: UUT_SAVE_CATEGORY_DISMISS_ERROR,
  };
}

export function useSaveCategory(params) {
  const dispatch = useDispatch();

  const { saveCategoryPending, saveCategoryError } = useSelector(
    state => ({
      saveCategoryPending: state.uut.saveCategoryPending,
      saveCategoryError: state.uut.saveCategoryError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(saveCategory(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSaveCategoryError());
  }, [dispatch]);

  return {
    saveCategory: boundAction,
    saveCategoryPending,
    saveCategoryError,
    dismissSaveCategoryError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UUT_SAVE_CATEGORY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveCategoryPending: true,
        saveCategoryError: null,
      };

    case UUT_SAVE_CATEGORY_SUCCESS:
      // The request is success
      return {
        ...state,
        saveCategorySuccess: true,
        saveCategoryPending: false,
        saveCategoryError: null,
      };

    case UUT_SAVE_CATEGORY_FAILURE:
      // The request is failed
      return {
        ...state,
        saveCategoryPending: false,
        saveCategoryError: action.data.error,
      };

    case UUT_SAVE_CATEGORY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveCategoryError: null,
      };

    default:
      return state;
  }
}
