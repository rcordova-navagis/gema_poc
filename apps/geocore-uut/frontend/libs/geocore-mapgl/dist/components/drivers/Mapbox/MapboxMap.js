'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMapGl = require('react-map-gl');

var _reactMapGl2 = _interopRequireDefault(_reactMapGl);

var _recompose = require('recompose');

require('mapbox-gl/dist/mapbox-gl.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MapboxMap() {
    var _defaultViewport = {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    };

    return (0, _recompose.compose)((0, _recompose.withState)('viewport', 'setViewport', function (props) {
        _defaultViewport.latitude = parseFloat(props.config.MAP_DEFAULT_CENTER_LAT);
        _defaultViewport.longitude = parseFloat(props.config.MAP_DEFAULT_CENTER_LNG);
        _defaultViewport.zoom = parseInt(props.config.MAP_DEFAULT_ZOOM);

        return _defaultViewport;
    }), (0, _recompose.withHandlers)({
        setViewport: function setViewport(_ref) {
            var _setViewport = _ref.setViewport;
            return function (viewport) {
                return _setViewport(viewport);
            };
        }
    }))(function (props) {
        return _react2.default.createElement(_reactMapGl2.default, _extends({}, props.viewport, {
            onViewportChange: props.setViewport,
            mapboxApiAccessToken: props.config.MAPBOX_TOKEN,
            width: '100%',
            height: '100%'
        }));
    });
}
exports.default = MapboxMap;