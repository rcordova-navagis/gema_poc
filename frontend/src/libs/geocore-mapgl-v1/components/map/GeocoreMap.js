import React, {Component} from 'react';
import MapFactory from './MapFactory';
import { functions, isEqual, omit } from 'underscore';


function GeocoreMap (props) {
    const factory = new MapFactory(props.config.MAP_DRIVER);

    const MyMapComponent = factory.getMapComponent(props);

    const translatedMapOptions = factory.translateMapOptions(props.mapOptions);

    return (
        <MyMapComponent {...props} mapOptions={translatedMapOptions}>
            {props.children}
        </MyMapComponent>
    );
}

// function shouldNotUpdate(props, nextProps) {
//     const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
//     const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
//     const noFuncChange =
//         funcs.length === nextFuncs.length &&
//         funcs.every(fn => props[fn].toString() === nextProps[fn].toString());
//     return noPropChange && noFuncChange
// }
//
// export default React.memo(GeocoreMap, shouldNotUpdate);
export default GeocoreMap;
