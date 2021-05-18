import React, {forwardRef} from 'react';
import {LayerOverlayManager as GmapLayerOverlayManager} from './../mapdrivers/googlemap/index';
import {LayerOverlayManager as MapboxLayerOverlayManager} from './../mapdrivers/mapbox/index';
import { functions, isEqual, omit } from 'underscore';
import {UNDEFINED_MAP_DRIVER} from "../constants/index";


function LayerOverlayComp (props) {
    let OverlayManager;

    switch (props.config.MAP_DRIVER) {
        case 'mapbox':
            OverlayManager = MapboxLayerOverlayManager;
            break;
        case 'gmap':
            OverlayManager = GmapLayerOverlayManager;
            break;
        default:
            throw new Error(UNDEFINED_MAP_DRIVER);
    }

    return (
        <OverlayManager {...props} ></OverlayManager>
    );
}

const LayerOverlay = forwardRef((props, ref) => {
    if (ref && ref.current) {
        return (
            <LayerOverlayComp config={props.config}
                              layers={props.layers}
                              map={ref.current}
            />
        );
    }

    return null;
});

function shouldNotUpdate(props, nextProps) {
    const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
    const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
    const noFuncChange =
        funcs.length === nextFuncs.length &&
        funcs.every(fn => props[fn].toString() === nextProps[fn].toString());

    return noPropChange && noFuncChange;
}

export default React.memo(LayerOverlay, shouldNotUpdate);
