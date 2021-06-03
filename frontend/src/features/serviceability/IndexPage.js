import React, {useCallback, useEffect} from 'react';
import {GeocoreMap, LayerOverlay} from './../../libs/geocore-mapgl';
import {useSetMapViewport} from "../config/redux/setMapViewport";
import {useSelector} from "react-redux";

const _mapOptions = {zoom: 6};

export default function IndexPage(props) {
  const {setMapViewport} = useSetMapViewport();
  const config = useSelector(state => state.config);

  const handleMapLoad = useCallback((map) => {
    if (!map) return;

    // mapRef.current = map;
    //
    // setMapLoaded(true);
    // this.addLayers.call(this);
  }, []);

  return (
    <div className="serviceability-index-page">
        <GeocoreMap
            onMapLoad={handleMapLoad}
            onViewportChange={setMapViewport}
            config={config}
            mapOptions={_mapOptions}>
        </GeocoreMap>
    </div>
  );
};

