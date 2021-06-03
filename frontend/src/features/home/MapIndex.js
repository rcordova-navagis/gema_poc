/*global google*/
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {CONFIG} from './../../config';
import {useSelector} from 'react-redux';
import {GeocoreMap, LayerOverlay} from './../../libs/geocore-mapgl';
import LayerMenu from '../common/map/LayerMenu';
import MapSettings from '../common/map/MapSettings';
import {useSetMapViewport} from '../config/redux/setMapViewport';
import {layerCategoriesSubscription, layersSubscription} from './../../libs/geocore-common/gql';
import {useSubscription} from '@apollo/react-hooks/lib/useSubscription';
import {CategoriesTransformer} from "./../../libs/geocore-common/utils";
import {useToggleMapLayers} from "../common/redux/hooks";
import {isEmpty} from 'underscore';
import {useGetBoundaryHierarchy} from "../boundaries/redux/hooks";
import LayerResolver from "../common/layers/LayerResolver";
import {useShowLayerDetails, useToggleLayerTableVisibility} from "../layers/redux/hooks";
import {LayerDatatable, LayerDetails} from "../layers";


const _mapOptions = {zoom: 6};
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

        // new MVTLayer({
        //     data: `${CONFIG.TILESTACHE_BASE_URL}/osmpoints/{z}/{x}/{y}.pbf`,
        //     pickable: true,
        //     filled: true,
        //     getFillColor: [200, 0, 0],
        //     getRadius: 20,
        //     pointRadiusMinPixels: 4,
        //     pointRadiusMaxPixels: 4,
        // }),

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
    // const config = useSelector(state => state.config);
    const config = props.config;
    const checkedLayers = useSelector(state => state.common.checkedLayers);
    const {setMapViewport} = useSetMapViewport();
    const [tilestacheLayers, setTilestacheLayers] = useState([]);
    const {getBoundaryHierarchy, getBoundaryHierarchyPending, boundaryHierarchy} = useGetBoundaryHierarchy();
    const {showLayerDetails, isLayerDetailsVisible, layerDetailsData} = useShowLayerDetails();
    const {toggleLayerTableVisibility, isLayerTableVisible} = useToggleLayerTableVisibility();

    const onClickObject = (info, event) => {
        console.log('on click object: ', info, event);
    };

    const handleMapLoad = useCallback((map) => {
            if (!map) return;

            mapRef.current = map;

            setMapLoaded(true);
            // this.addLayers.call(this);
    }, []);

    const {data: layersData, loading, error} = useSubscription(layersSubscription);
    const {data: categoryData, loading: loadingLayerCategories, error: errorLayerCategories} = useSubscription(layerCategoriesSubscription);

    // useEffect(() => {
    //     if (layersData && layersData.layers) {
    //         setTilestacheLayers(
    //             layersData.layers.filter(layer => {
    //                 return layer.dataset && layer.dataset.django_tilestache_layer;
    //             }).map(layer => LayerResolver.getLayer(layer))
    //         );
    //     }
    // }, [layersData]);

    useEffect(() => {
        if (categoryData && Array.isArray(categoryData.categories) && layersData && layersData.layers && Array.isArray(layersData.layers)) {
            let hierarchy = CategoriesTransformer.transformLayerHierarchy(layersData.layers, categoryData.categories);
            // let hierarchy = CategoriesTransformer.transformToDropdownTreeSelect(categoryData.categories);
            setLayersHierarchy(hierarchy);
        }
    }, [layersData, categoryData]);

    useEffect(() => {
        if (layersData && layersData.layers && checkedLayers) {
            setTilestacheLayers(
                layersData.layers.filter(layer => {
                    return layer.dataset && layer.dataset.django_tilestache_layer;
                }).map(layer => LayerResolver.getLayer(layer, checkedLayers.includes(String(layer.id)), showLayerDetails))
            );
        }
    }, [showLayerDetails, checkedLayers, layersData]);


    useEffect(function() {
        // setTilestacheLayers([
        //     new MVTLayer({
        //         data: `${CONFIG.TILESTACHE_BASE_URL}/osmpoints/{z}/{x}/{y}.pbf`,
        //         pickable: true,
        //         filled: true,
        //         getFillColor: [200, 0, 0],
        //         getRadius: 20,
        //         pointRadiusMinPixels: 4,
        //         pointRadiusMaxPixels: 4,
        //         minZoom: 8,
        //         maxZoom: 23,
        //         onClick: onClickObject,
        //     })
        // ]);

        getBoundaryHierarchy();

        return () => {
            if (mapRef && mapRef.current) {
                mapRef.current = null;
            }

            setMapLoaded(false);
        }
    }, [getBoundaryHierarchy]);

    if (isEmpty(config)) return null;

    return (
      <div className="home-map-index">
        <LayerMenu layersHierarchy={layersHierarchy}
                   boundaryHierarchy={boundaryHierarchy}
                   toggleMapLayers={toggleMapLayers}
                   toggleLayerTableVisibility={toggleLayerTableVisibility}
                   mapLoaded={mapLoaded} />

        <MapSettings config={config} />

        <LayerDatatable isLayerTableVisible={isLayerTableVisible}
                        toggleLayerTableVisibility={toggleLayerTableVisibility} />

        {
            isLayerDetailsVisible && <LayerDetails layerDetailsData={layerDetailsData} />
        }

        <GeocoreMap
            onMapLoad={handleMapLoad}
            onViewportChange={setMapViewport}
            config={config}
            mapOptions={_mapOptions}>
            <LayerOverlay config={config} layers={tilestacheLayers} ref={mapRef} />
        </GeocoreMap>
      </div>
    );
}

export default MapIndex;
