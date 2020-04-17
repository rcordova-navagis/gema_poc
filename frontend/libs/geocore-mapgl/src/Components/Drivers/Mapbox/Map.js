import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import {compose, withProps, withState, withHandlers} from 'recompose';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map () {
    let _defaultViewport = {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    };

    return compose(
        withState('viewport', 'setViewport', (props) => {
            _defaultViewport.latitude = parseFloat(props.config.MAP_DEFAULT_CENTER_LAT);
            _defaultViewport.longitude = parseFloat(props.config.MAP_DEFAULT_CENTER_LNG);
            _defaultViewport.zoom = parseInt(props.config.MAP_DEFAULT_ZOOM);

            return _defaultViewport;
        }),
        withHandlers({
            setViewport: ({setViewport}) => (viewport) => setViewport(viewport)
        })
    )((props) => {
        return <ReactMapGL
            {...props.viewport}
            onViewportChange={props.setViewport}
            mapboxApiAccessToken={props.config.MAPBOX_TOKEN}
            width="100%"
            height="100%"
        />;
    });
}
