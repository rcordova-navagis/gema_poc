import React, { useCallback, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export default function Map (props) {
    const [viewport, setViewport] = useState(props.config.mapViewport);
    const _onViewportChange = props.onViewportChange;

    const _setViewport = useCallback((viewport) => {
        setViewport(viewport);
        _onViewportChange(viewport);
    }, [_onViewportChange]);

    return <ReactMapGL
                {...viewport}
                onViewportChange={_setViewport}
                width="100%"
                height="100%"
                mapboxApiAccessToken={props.config.MAPBOX_TOKEN}
    >
        {props.children}
    </ReactMapGL >;
}
