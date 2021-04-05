import React, {useEffect} from 'react';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';


const deckglOverlay = new GoogleMapsOverlay({
    layers: [],
    onWebGLInitialized: (context) => {
        console.log('onWebGLInitialized: ', context);
    },
    // onAfterRender: (context) => {
        // console.log('onAfterRender: ', context);
    // }
});

const LayerOverlayManager = (props) => {
    const _map = props.map,
          _layers = props.layers;

    useEffect(() => {
        if (_map) {
            deckglOverlay.setMap(_map);

            deckglOverlay.setProps({
                layers: _layers
            });

            // console.log('deckglOverlay updated: ',deckglOverlay, _map, _layers);
        }
    }, [_map, _layers]);

    return null;
};

export default LayerOverlayManager;
