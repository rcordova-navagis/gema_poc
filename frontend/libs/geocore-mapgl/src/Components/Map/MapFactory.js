import React from 'react';
import {GoogleMapComponent, MapboxMap} from '../drivers/index';

const  _DEFAULT_DRIVER = 'gmap';

export default class MapFactory {

    constructor(driver = _DEFAULT_DRIVER) {
        this._driver = driver.toLowerCase();
    }

    getMapComponent() {
        let MapComponent;

        switch (this._driver) {
            case 'mapbox':
                MapComponent = MapboxMap();
                break;
            default:
                MapComponent = GoogleMapComponent();
        }

        return MapComponent;
    }

    translateMapOptions(options) {
        // TODO: create function to translate abstract map options to destination options
        return options;
    }
}