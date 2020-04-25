/*global google*/
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {CONFIG} from './../../config';
import {useSelector} from 'react-redux';
import {GeocoreMap, LayerOverlay} from './../../libs/geocore-mapgl';
import LayerMenu from '../common/map/LayerMenu';
import MapSettings from '../common/map/MapSettings';
import {useSetMapViewport} from '../config/redux/setMapViewport';
import {MVTLayer} from '@deck.gl/geo-layers';
import {GeoJsonLayer} from '@deck.gl/layers';

const _mapOptions = {};
// let _layerManager;

const layers = [
        // new MVTLayer({
        //     data: `${CONFIG.TILESTACHE_BASE_URL}/osmroads/{z}/{x}/{y}.pbf`,
        //     pickable: false,
        //     stroked: true,
        //     filled: true,
        //     extruded: false,
        //     lineWidthUnits: 'pixels',
        //     lineWidthScale: 1,
        //     getFillColor: [160, 160, 180],
        //     getLineColor: [0, 0, 255, 200],
        //     getLineWidth: 1,
        // }),

        new MVTLayer({
            data: `${CONFIG.TILESTACHE_BASE_URL}/osmpoints/{z}/{x}/{y}.pbf`,
            pickable: false,
            filled: true,
            getFillColor: [200, 0, 0],
            getRadius: 20,
            pointRadiusMinPixels: 4,
            pointRadiusMaxPixels: 4
        }),

        // new MVTLayer({
        //     data: `${CONFIG.TILESTACHE_BASE_URL}/osmpolygons/{z}/{x}/{y}.pbf`,
        //     pickable: true,
        //     stroked: true,
        //     filled: false,
        //     extruded: false,
        //     lineWidthUnits: 'pixels',
        //     lineWidthScale: 1,
        //     getLineColor: [0, 200, 0, 50],
        //     getLineWidth: 1,
        //     onClick: this.onClickObject.bind(this),
        // })
];

function MapIndex (props) {
    const mapRef = useRef(null);

    const [mapLoaded, setMapLoaded] = useState(false);

    const config = useSelector(state => state.config);

    const {setMapViewport} = useSetMapViewport();

    const handleMapLoad = useCallback((map) => {
            if (!map) return;

            mapRef.current = map;

            setMapLoaded(true);
            // this.addLayers.call(this);
    }, []);

    useEffect(function() {
        return function cleanup() {
            if (mapRef && mapRef.current) {
                mapRef.current = null;
            }

            setMapLoaded(false);
        }
    }, []);


    return (
      <div className="home-map-index">
        <LayerMenu />

        <MapSettings config={config} />

        <GeocoreMap
            onMapLoad={handleMapLoad}
            onViewportChange={setMapViewport}
            config={config}
            mapOptions={_mapOptions}
        >
            <LayerOverlay config={config} layers={layers} ref={mapRef} />
        </GeocoreMap>
      </div>
    );
}

export default MapIndex;
