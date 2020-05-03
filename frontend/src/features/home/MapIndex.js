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
import {layerCategoriesSubscription, layersSubscription} from './../../libs/geocore-common/gql';
import {useSubscription} from '@apollo/react-hooks/lib/useSubscription';
import {CategoriesTransformer} from "./../../libs/geocore-common/utils";
import {useToggleMapLayers} from "../common/redux/hooks";


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
    const {toggleMapLayers} = useToggleMapLayers();
    const [layersHierarchy, setLayersHierarchy] = useState([]);
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const config = useSelector(state => state.config);
    const checkedLayers = useSelector(state => state.common.checkedLayers);
    const {setMapViewport} = useSetMapViewport();
    const [tilestacheLayers, setTilestacheLayers] = useState([]);


    const handleMapLoad = useCallback((map) => {
            if (!map) return;

            mapRef.current = map;

            setMapLoaded(true);
            // this.addLayers.call(this);
    }, []);

    const {data: layersData, loading, error} = useSubscription(layersSubscription);
    // const {data: categoryData, loading: loadingLayerCategories, error: errorLayerCategories} = useSubscription(layerCategoriesSubscription);

    useEffect(() => {
        console.log('layersData: ',layersData);
        if (layersData && layersData.layers) {
            setTilestacheLayers(layersData.layers.filter(layer => {
                return layer.dataset && layer.dataset.django_tilestache_layer;
            }).map(layer => {
                return new MVTLayer({
                    id: layer.id,
                    data: `${CONFIG.TILESTACHE_BASE_URL}/${layer.dataset.django_tilestache_layer.name}/{z}/{x}/{y}.pbf`,
                    pickable: false,
                    filled: true,
                    getFillColor: [200, 0, 0],
                    getRadius: 20,
                    pointRadiusMinPixels: 4,
                    pointRadiusMaxPixels: 4,
                    visible: false,
                });
            }));
            setLayersHierarchy(layersData.layers);
            // setTilestacheLayers([
            //     new MVTLayer({
            //         data: `${CONFIG.TILESTACHE_BASE_URL}/osmpoints/{z}/{x}/{y}.pbf`,
            //         pickable: false,
            //         filled: true,
            //         getFillColor: [200, 0, 0],
            //         getRadius: 20,
            //         pointRadiusMinPixels: 4,
            //         pointRadiusMaxPixels: 4
            //     })
            // ]);
        }
    }, [layersData]);

    useEffect(() => {
        console.log('checkedLayers changed: ',checkedLayers);
        // if (Array.isArray(tilestacheLayers) && tilestacheLayers.length) {
        setTilestacheLayers( t => t.map(layer => {
                layer.visible = checkedLayers.includes(layer.id);
                return layer;
            })
        );

        // }
    }, [checkedLayers]);

    useEffect(function() {
        return function cleanup() {
            if (mapRef && mapRef.current) {
                mapRef.current = null;
            }

            setMapLoaded(false);
        }
    }, []);

    console.log('tilestache laeyrs ',tilestacheLayers);

    return (
      <div className="home-map-index">
        <LayerMenu layersHierarchy={layersHierarchy} toggleMapLayers={toggleMapLayers} />

        <MapSettings config={config} />

        <GeocoreMap
            onMapLoad={handleMapLoad}
            onViewportChange={setMapViewport}
            config={config}
            mapOptions={_mapOptions}
        >
            <LayerOverlay config={config} layers={tilestacheLayers} ref={mapRef} />
        </GeocoreMap>
      </div>
    );
}

export default MapIndex;
