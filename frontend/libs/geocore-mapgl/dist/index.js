'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LayerManager = exports.GeocoreMap = undefined;

var _GeocoreMap = require('./components/map/GeocoreMap');

var _GeocoreMap2 = _interopRequireDefault(_GeocoreMap);

var _LayerManager = require('./layers/LayerManager');

var _LayerManager2 = _interopRequireDefault(_LayerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.GeocoreMap = _GeocoreMap2.default;
exports.LayerManager = _LayerManager2.default;
exports.default = _GeocoreMap2.default;