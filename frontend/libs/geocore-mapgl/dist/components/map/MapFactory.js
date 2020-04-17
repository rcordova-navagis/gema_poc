'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../drivers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _DEFAULT_DRIVER = 'gmap';

var MapFactory = function () {
    function MapFactory() {
        var driver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _DEFAULT_DRIVER;

        _classCallCheck(this, MapFactory);

        this._driver = driver.toLowerCase();
    }

    _createClass(MapFactory, [{
        key: 'getMapComponent',
        value: function getMapComponent() {
            var MapComponent = void 0;

            switch (this._driver) {
                case 'mapbox':
                    MapComponent = (0, _index.MapboxMap)();
                    break;
                default:
                    MapComponent = (0, _index.GoogleMapComponent)();
            }

            return MapComponent;
        }
    }, {
        key: 'translateMapOptions',
        value: function translateMapOptions(options) {
            // TODO: create function to translate abstract map options to destination options
            return options;
        }
    }]);

    return MapFactory;
}();

exports.default = MapFactory;