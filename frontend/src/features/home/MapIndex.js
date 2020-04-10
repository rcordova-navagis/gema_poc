/*global google*/
import React, { Component } from 'react';
import {compose, withProps, withHandlers} from 'recompose';
import {MAP} from 'react-google-maps/lib/constants';
import {GoogleMap, withGoogleMap} from "react-google-maps";
import LayerMenu from "../common/LayerMenu";
import {getTile} from "../common/geocore-mapviz/VectorLayer";
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {GeoJsonLayer} from '@deck.gl/layers';
import {MVTLayer} from '@deck.gl/geo-layers';


const MyMapComponent = compose(
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
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat: 14.6181362, lng: 121.0703544}}
        defaultOptions={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            controlSize: 34,
        }}
        ref={props.onMapMounted}
    >
    </GoogleMap>
);


export default class MapIndex extends Component {

    state = {
        layers: [],
        layerIds: []
    };

    deckglOverlay = new GoogleMapsOverlay({
        layers: [],
        onWebGLInitialized: (context) => {
            console.log('onWebGLInitialized: ', context);
        },
        onAfterRender: (context) => {
            console.log('onAfterRender: ', context);
        }
    });

    handleMapLoad(map) {
        if (!map) return;

        let that = this;

        console.log('handleMapLoad: ',map, ' deckglOverlay: ',this.deckglOverlay);

        this.deckglOverlay.setMap(map);

        // map.addListener('zoom_changed', function () {
        //     this.deckglOverlay.setProps({layers: []});
        // }.bind(this));

        // let ymax,
        //     y;

        // const TILESTACHE_BASE_URL = 'http://192.168.178.4:8080/api/tilestache',
        const TILESTACHE_BASE_URL = 'http://192.168.178.4:1001',
              TILESTACHE_LAYER = 'osmroads';

        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            let layer = new MVTLayer({
                data: `${TILESTACHE_BASE_URL}/${TILESTACHE_LAYER}/{z}/{x}/{y}.pbf`,
                pickable: false,
                stroked: true,
                filled: true,
                extruded: false,
                lineWidthUnits: 'pixels',
                lineWidthScale: 1,
                getFillColor: [160, 160, 180, 200],
                getLineColor: [0, 0, 255, 200],
                getLineWidth: 1,
            });

            this.deckglOverlay.setProps({
                layers: this.deckglOverlay.props.layers.concat(layer)
            });
        }.bind(this));

        // let ymax,
        //     y;
        // let imageTile = new google.maps.ImageMapType({
        //     getTileUrl: function (coord, zoom) {
        //         ymax = 1 << zoom;
        //         // y = ymax - coord.y - 1;
        //         y = coord.y;
        //
        //         that.setLayer.call(that, zoom, coord.x, y);
        //
        //         // return `${TILESTACHE_BASE_URL}/${TILESTACHE_LAYER}/${zoom}/${coord.x}/${y}.png`;
        //         return "http://www.maptiler.org/img/none.png";
        //     },
        //     tileSize: new google.maps.Size(256, 256),
        //     name: "osmroads",
        //     opacity: 1.0
        // });
        //
        // map.overlayMapTypes.insertAt(1, imageTile);
  }

  render() {
    return (
        <div className="home-map-index">
          <LayerMenu />

          <MyMapComponent onMapLoad={this.handleMapLoad.bind(this)} />
        </div>
    );
  }
}
