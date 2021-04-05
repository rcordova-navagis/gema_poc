import {CONFIG} from "../../../config";

const initialState = {
    ...CONFIG,

    mapViewport: {
        zoom: parseInt(CONFIG.MAP_DEFAULT_ZOOM),
        latitude: parseFloat(CONFIG.MAP_DEFAULT_CENTER_LAT),
        longitude: parseFloat(CONFIG.MAP_DEFAULT_CENTER_LNG),
    },

    MAP_TYPE: 'roadmap'
};

export default initialState;
