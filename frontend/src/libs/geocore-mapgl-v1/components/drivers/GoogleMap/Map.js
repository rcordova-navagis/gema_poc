/*global google*/

import React, {Component, useState, useCallback} from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';


let _center,
    _viewport;


function Map (props) {
    console.log('Gmap: ',props);

    // const [viewport, setViewport]= useState(props.config.mapViewport);
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

        console.log('bounds changed: ',_viewport);

        // setViewport(_viewport);
        // props.onViewportChange(_viewport);
    };

    return (
            <GoogleMap
                id="geocore-gmap"
                mapContainerStyle={{height: `100%`}}

                center={{lat: props.config.mapViewport.latitude, lng: props.config.mapViewport.longitude}}
                zoom={props.config.mapViewport.zoom}

                options={_options}

                clickableIcons={false}
                onLoad={_onLoad}
                onIdle={boundsChangedThrottled}
            >
                {props.children}
            </GoogleMap>
    );
}

export default Map;
