import React from 'react';
import DeckGL from 'deck.gl';

// const DeckGLComponent = (props) => <DeckGL viewState={props.mapViewport}
//                                            layers={props.layers}
//                                    />;

const LayerOverlayManager = (props) => {
    console.log('MapboxLayerOverlayManager: ',props);

    return (
        <DeckGL initialViewState={props.config.mapViewport}
                viewState={props.config.mapViewport}
                layers={props.layers}
        />
    );
};

export default LayerOverlayManager;
