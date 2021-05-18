import initialState from './initialState';

import {reducer as switchMapDriver} from "./switchMapDriver";
import {reducer as setMapViewportReducer} from "./setMapViewport";
import {reducer as switchMapType} from "./switchMapType";

const reducers = [
    switchMapDriver,
    setMapViewportReducer,
    switchMapType,
];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
};