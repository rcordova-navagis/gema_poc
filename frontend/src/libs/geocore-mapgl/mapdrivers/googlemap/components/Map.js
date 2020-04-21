/*global google*/

import React, {Component, useState, useCallback} from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';
import { throttle, functions, isEqual, omit } from 'underscore';


let _center,
    _viewport;


function Map (props) {
    console.log('Gmap: ',props);

    const [map, setMap]= useState(null);

    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: props.config.GMAP_API_KEY,
    //     libraries: 'geometry',
    //     version: '3'
    // });

    const onMapLoad = props.onMapLoad;

    const _onLoad = useCallback((mapInstance) => {
        onMapLoad(mapInstance);

        setMap(mapInstance);
    }, [onMapLoad]);

    const _options = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        controlSize: 34,
        // center: {lat: viewport.latitude, lng: viewport.longitude},
        // zoom: viewport.zoom,
    };

    const boundsChangedThrottled = () => {
        if (!map) return;

        _center = map.getCenter();

        _viewport = {
            latitude: _center.lat(),
            longitude: _center.lng(),
            zoom: map.getZoom(),
        };

        props.onViewportChange(_viewport);
    };

    return (
            <GoogleMap
                id="geocore-gmap"
                mapContainerStyle={{height: `100%`}}

                center={{lat: props.config.mapViewport.latitude, lng: props.config.mapViewport.longitude}}
                zoom={props.config.mapViewport.zoom}
                mapTypeId={props.config.MAP_TYPE}
                options={_options}

                clickableIcons={false}
                onLoad={_onLoad}
                onIdle={boundsChangedThrottled}
            >
                {props.children}
            </GoogleMap>
    );
}

// function shouldNotUpdate(props, nextProps) {
//     const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
//     const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
//     // const noFuncChange =
//     //     funcs.length === nextFuncs.length &&
//     //     funcs.every(fn => props[fn].toString() === nextProps[fn].toString());
//     // return noPropChange && noFuncChange
//
//     return noPropChange;
// }

// export default React.memo(Map, shouldNotUpdate);
export default Map;