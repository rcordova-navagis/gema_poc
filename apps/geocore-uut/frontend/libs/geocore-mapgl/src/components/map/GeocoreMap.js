import React from 'react';
import MapFactory from './MapFactory';


export default function GeocoreMap (props) {
    const factory = new MapFactory(props.config.MAP_DRIVER);

    const MyMapComponent = factory.getMapComponent();
    const translatedMapOptions = factory.translateMapOptions(props.mapOptions);

    return <MyMapComponent {...props}
                           mapOptions={translatedMapOptions} />
}
