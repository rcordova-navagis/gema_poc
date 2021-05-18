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
    console.log('Gmap LayerOverlayManager',props);
    const _map = props.map,
          _layers = props.layers;

    useEffect(() => {
        console.log('use Effect on Gmap LayerOverlayManager',_map,_layers);

        if (_map) {
            deckglOverlay.setMap(_map);

            deckglOverlay.setProps({
                layers: _layers
            });
            // console.log('deckglOverlay updated: ',deckglOverlay, _map, _layers);
        }

        return function cleanup() {
            deckglOverlay.finalize();

            console.log('clean up on LayerOverlayManager');
        };
    }, [_map, _layers]);

    return null;
};

export default LayerOverlayManager;
