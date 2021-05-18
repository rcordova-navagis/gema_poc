import GeocoreMap from './components/map/GeocoreMap';
import {default as GoogleMap} from './components/drivers/GoogleMap/Map';

import LayerManager from './layers/LayerManager';
import {default as LayerOverlay} from './layers/LayerOverlay';
import GmapLayerOverlayManager from './layers/GoogleMap/LayerOverlayManager';

export {
    GeocoreMap,
    GoogleMap,

    LayerOverlay,
    LayerManager,
    GmapLayerOverlayManager
};

export default GeocoreMap;
