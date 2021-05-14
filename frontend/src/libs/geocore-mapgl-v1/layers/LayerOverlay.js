import React, {forwardRef} from 'react';
import GmapLayerOverlayManager from './GoogleMap/LayerOverlayManager';
import MapboxLayerOverlayManager from './Mapbox/LayerOverlayManager';
import {functions, isEqual, omit} from "underscore";

function LayerOverlayComp (props) {
    console.log('LayerOverlay called: ',props);

    const TheComp = props.config.MAP_DRIVER === 'gmap'
            ? GmapLayerOverlayManager
            : MapboxLayerOverlayManager;

    return (
        <TheComp {...props} ></TheComp>
    );
}

const LayerOverlay = forwardRef((props, ref) => {
    console.log('LayerOverlay forwardRef: ',props,ref);

    return (
        <LayerOverlayComp config={props.config}
                             layers={props.layers}
                             map={ref.current}
        />
    );
});

export default LayerOverlay;
