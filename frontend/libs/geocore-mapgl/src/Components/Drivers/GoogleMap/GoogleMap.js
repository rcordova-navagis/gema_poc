import {GoogleMap as GoogleMapComponent, withGoogleMap} from "react-google-maps";
import {compose, withProps, withHandlers} from 'recompose';
import {MAP} from 'react-google-maps/lib/constants';

const translateMapOptions = (mapOptions) => {
    let _translatedOptions = {};
};


export default (mapOptions) => {
    return compose(
        withProps({
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `100%`}}/>,
            mapElement: <div style={{height: `100%`}}/>,
        }),
        withHandlers((props) => {
            return {
                onMapMounted: () => ref => {
                    if (ref && ref.context && ref.context.hasOwnProperty(MAP)) {
                        console.log('map mounted: ', ref.context[MAP], ref);

                        props.onMapLoad(ref.context[MAP]);
                    }
                }
            }
        }),
        withGoogleMap
    )(props =>
        <GoogleMapComponent
            defaultZoom={15}
            defaultCenter={{lat: 14.6181362, lng: 121.0703544}}
            defaultOptions={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                controlSize: 34,
                clickableIcons: false
            }}
            ref={props.onMapMounted}
        >
        </GoogleMapComponent>
    );
}
