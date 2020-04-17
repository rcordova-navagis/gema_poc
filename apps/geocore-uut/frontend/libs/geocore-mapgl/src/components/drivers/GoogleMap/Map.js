/*global google*/

import React from 'react';
import {GoogleMap, withGoogleMap} from "react-google-maps";
import {compose, withProps, withHandlers} from 'recompose';
import {MAP} from 'react-google-maps/lib/constants';


export default function Map (props) {
    let _passedProps = props;

    return compose(
        withProps({
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `100%`}}/>,
            mapElement: <div style={{height: `100%`}}/>,
        }),
        withHandlers((props) => {
            return {
                onMapMounted: () => ref => {
                    if (ref && ref.context && ref.context.hasOwnProperty(MAP)) {
                        console.log('map mounted: ', ref.context[MAP], ref);

                        google.maps.event.addListenerOnce(ref.context[MAP], 'tilesloaded', function () {
                            // deckglOverlay = new GoogleMapsOverlay({
                            //     layers: [],
                            //     onWebGLInitialized: (context) => {
                            //         console.log('onWebGLInitialized: ', context);
                            //     },
                            //     onAfterRender: (context) => {
                            //         console.log('onAfterRender: ', context);
                            //     }
                            // });
                            // deckglOverlay.setMap(map);

                            props.onMapLoad(ref.context[MAP]);
                        }.bind(this));
                    }
                }
            }
        }),
        withGoogleMap
    )(props =>
        <GoogleMap
            defaultZoom={parseInt(props.config.MAP_DEFAULT_ZOOM)}
            defaultCenter={{lat: parseFloat(props.config.MAP_DEFAULT_CENTER_LAT), lng: parseFloat(props.config.MAP_DEFAULT_CENTER_LNG)}}
            defaultOptions={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                controlSize: 34,
                clickableIcons: false
            }}
            ref={props.onMapMounted}
            {..._passedProps}
        >
        </GoogleMap>
    );
}
