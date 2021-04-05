import React, { useState, useEffect, useRef, useCallback } from 'react';
import {GeocoreMap, LayerOverlay} from './../../libs/geocore-mapgl';
import {CONFIG} from './../../config';
import {useSelector} from 'react-redux';
import {useSetMapViewport} from '../config/redux/setMapViewport';
import {MVTLayer} from '@deck.gl/geo-layers';

const _mapOptions = {};


export default function DatasetMap(props) {
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const config = useSelector(state => state.config);
    const {setMapViewport} = useSetMapViewport();
    const [tilestacheLayers, setTilestacheLayers] = useState([]);

    const handleMapLoad = useCallback((map) => {
        console.log('handleMapLoad: ',map);
        if (!map) return;

        mapRef.current = map;

        setMapLoaded(true);
        // this.addLayers.call(this);
    }, []);

    useEffect(() => {
        if (props.dataset.dataset_queue) {
            setTilestacheLayers([
                new MVTLayer({
                    data: `${CONFIG.TILESTACHE_BASE_URL}/${props.dataset.dataset_queue.name}/{z}/{x}/{y}.pbf`,
                    pickable: false,
                    filled: true,
                    getFillColor: [200, 0, 0],
                    getRadius: 20,
                    pointRadiusMinPixels: 4,
                    pointRadiusMaxPixels: 4
                })
            ]);
        }
    }, [props.dataset]);


    useEffect(function() {
        return function cleanup() {
            if (mapRef && mapRef.current) {
                mapRef.current = null;
            }

            setMapLoaded(false);
        }
    }, []);

  return (
    <div className="uut-dataset-map">
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
};

DatasetMap.propTypes = {};
DatasetMap.defaultProps = {};
