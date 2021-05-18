import React from 'react';
import {Map as Gmap} from '../../mapdrivers/googlemap/index';
import {Map as MapboxMap} from '../../mapdrivers/mapbox/index';
import {UNDEFINED_MAP_DRIVER} from './../../constants';

const  _DEFAULT_DRIVER = 'gmap';

export default class MapFactory {

    constructor(driver = _DEFAULT_DRIVER) {
        this._driver = driver.toLowerCase();
    }

    getMapComponent() {
        let MapComponent;

        switch (this._driver) {
            case 'mapbox':
                MapComponent = MapboxMap;
                break;
            case 'gmap':
                MapComponent = Gmap;
                break;
            default:
                throw new Error(UNDEFINED_MAP_DRIVER);
        }

        return MapComponent;
    }

    translateMapOptions(options) {
        // TODO: create function to translate abstract map options to destination options
        return options;
    }
}