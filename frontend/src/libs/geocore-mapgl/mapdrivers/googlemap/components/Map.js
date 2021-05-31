/*global google*/

import React, {Component, useState, useCallback} from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';


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
    const styles = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ];

    const onMapLoad = props.onMapLoad;

    const _onLoad = useCallback((mapInstance) => {
        onMapLoad(mapInstance);

        setMap(mapInstance);
    }, [onMapLoad]);

    const _options = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: true,
        controlSize: 34,
        styles: styles,
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

export default Map;