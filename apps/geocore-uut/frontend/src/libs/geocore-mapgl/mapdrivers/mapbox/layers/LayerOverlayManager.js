import React from 'react';
import DeckGL from 'deck.gl';

// const DeckGLComponent = (props) => <DeckGL viewState={props.viewport}
//                                            layers={props.layers}
//                                    />;

const LayerOverlayManager = (props) => {
    console.log('MapboxLayerOverlayManager: ',props);

    return (
        <DeckGL viewState={props.config.mapViewport}
                layers={props.layers}
        />
    );
};

export default LayerOverlayManager;
