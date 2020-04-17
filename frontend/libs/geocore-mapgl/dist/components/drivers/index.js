'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapboxMap = exports.GoogleMapComponent = undefined;

var _Map = require('./GoogleMap/Map');

var _Map2 = _interopRequireDefault(_Map);

var _Map3 = require('./Mapbox/Map');

var _Map4 = _interopRequireDefault(_Map3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.GoogleMapComponent = _Map2.default;
exports.MapboxMap = _Map4.default;