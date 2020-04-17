'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*global google*/

exports.default = Map;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGoogleMaps = require('react-google-maps');

var _recompose = require('recompose');

var _constants = require('react-google-maps/lib/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Map(props) {
    var _this = this;

    var _passedProps = props;

    return (0, _recompose.compose)((0, _recompose.withProps)({
        loadingElement: _react2.default.createElement('div', { style: { height: '100%' } }),
        containerElement: _react2.default.createElement('div', { style: { height: '100%' } }),
        mapElement: _react2.default.createElement('div', { style: { height: '100%' } })
    }), (0, _recompose.withHandlers)(function (props) {
        return {
            onMapMounted: function onMapMounted() {
                return function (ref) {
                    if (ref && ref.context && ref.context.hasOwnProperty(_constants.MAP)) {
                        console.log('map mounted: ', ref.context[_constants.MAP], ref);

                        google.maps.event.addListenerOnce(ref.context[_constants.MAP], 'tilesloaded', function () {
                            // deckglOverlay = new GoogleMapsOverlay({
                            //     layers: [],
                            //     onWebGLInitialized: (context) => {
                            //         console.log('onWebGLInitialized: ', context);
                            //     },
                            //     onAfterRender: (context) => {
                            //         console.log('onAfterRender: ', context);
                            //     }
                            // });
                            // deckglOverlay.setMap(map);

                            props.onMapLoad(ref.context[_constants.MAP]);
                        }.bind(_this));
                    }
                };
            }
        };
    }), _reactGoogleMaps.withGoogleMap)(function (props) {
        return _react2.default.createElement(_reactGoogleMaps.GoogleMap, _extends({
            defaultZoom: parseInt(props.config.MAP_DEFAULT_ZOOM),
            defaultCenter: { lat: parseFloat(props.config.MAP_DEFAULT_CENTER_LAT), lng: parseFloat(props.config.MAP_DEFAULT_CENTER_LNG) },
            defaultOptions: {
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                controlSize: 34,
                clickableIcons: false
            },
            ref: props.onMapMounted
        }, _passedProps));
    });
}