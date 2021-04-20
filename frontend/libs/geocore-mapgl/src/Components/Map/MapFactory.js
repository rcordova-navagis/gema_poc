import GoogleMap from '../drivers/GoogleMap/GoogleMap';
import MapboxMap from '../drivers/Mapbox/MapboxMap';

const  _DEFAULT_DRIVER = 'gmap';

export default class MapFactory {

    constructor(driver = _DEFAULT_DRIVER) {
        this._driver = driver.toLowerCase();
    }

    getMapComponent(props) {
        let MapComponent;

        switch (this._driver) {
            case 'mapbox':
                MapComponent = MapboxMap;
            default:
                MapComponent = GoogleMap;
        }

        return <MapComponent { ...props } />;
    }
}