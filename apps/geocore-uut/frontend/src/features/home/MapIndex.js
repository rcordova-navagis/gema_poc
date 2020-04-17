/*global google*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {GeocoreMap} from 'geocore-mapgl';

import LayerMenu from "../common/LayerMenu";
import {getTile} from "../common/geocore-mapviz/VectorLayer";
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {GeoJsonLayer} from '@deck.gl/layers';
import {MVTLayer} from '@deck.gl/geo-layers';

const TILESTACHE_BASE_URL = 'http://192.168.10.10:1001/api/tilestache';

const _mapOptions = {

};

class MapIndex extends Component {

    // state = {
    //     layers: [],
    //     layerIds: []
    // };

    constructor(props) {
        super(props);

        this.state = {
            layers: [],
            layerIds: [],
            mapDriver: 'gmap'
        };

        this.deckglOverlay = new GoogleMapsOverlay({
            layers: [],
            onWebGLInitialized: (context) => {
                console.log('onWebGLInitialized: ', context);
            },
            onAfterRender: (context) => {
                console.log('onAfterRender: ', context);
            }
        });
    }

    // deckglOverlay = new GoogleMapsOverlay({
    //     layers: [],
    //     onWebGLInitialized: (context) => {
    //         console.log('onWebGLInitialized: ', context);
    //     },
    //     onAfterRender: (context) => {
    //         console.log('onAfterRender: ', context);
    //     }
    // });

    setTooltip(object, content, x, y) {
        const el = document.getElementById('tooltip');
        if (object) {
            el.innerHTML = content;
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.zIndex = 11;
            el.style.backgroundColor = 'white';
            el.style.padding = '8px';
            el.style.left = x + 'px';
            el.style.top = y + 'px';
        } else {
            el.style.display = 'none';
        }
    }

    onClickObject(info) {
        let content = '';
        for (let i in info.object.properties) {
            content += `<b>${i}</b> ${info.object.properties[i]} <br>`;
        }
        this.setTooltip.call(this, info.object, content, info.x, info.y);
    }

    addLayers() {
        let layers = [
            // new MVTLayer({
            //     data: `${TILESTACHE_BASE_URL}/osmroads/{z}/{x}/{y}.pbf`,
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
                data: `${TILESTACHE_BASE_URL}/osmpoints/{z}/{x}/{y}.pbf`,
                pickable: true,
                filled: true,
                getFillColor: [200, 0, 0],
                getRadius: 20,
                pointRadiusMinPixels: 4,
                pointRadiusMaxPixels: 4,
                onClick: this.onClickObject.bind(this),
            }),

            // new MVTLayer({
            //     data: `${TILESTACHE_BASE_URL}/osmpolygons/{z}/{x}/{y}.pbf`,
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

        // let _layers = this.deckglOverlay.props.layers;
        // layers.forEach( layer => {
        //     _layers = _layers.concat(layer)
        // });

        this.deckglOverlay.setProps({
            layers: layers
        });
    }

    handleMapLoad(map) {
        if (!map) return;

        console.log('handleMapLoad: ',map, ' deckglOverlay: ',this.deckglOverlay);

        this.deckglOverlay.setMap(map);

        // google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            this.addLayers.call(this);
        // }.bind(this));
  }

  render() {
      // const MyMapComponent = this.props.config.MAP_DRIVER === 'gmap'
      //                        ? GoogleMapComponent()
      //                        : MapboxMap();

      return (
        <div className="home-map-index">
          <LayerMenu />

          <span id="tooltip"></span>

          <GeocoreMap
              onMapLoad={this.handleMapLoad.bind(this)}
              config={this.props.config}
              mapOptions={_mapOptions}
          />
        </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        config: state.config,
        common: state.common
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions,}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapIndex);