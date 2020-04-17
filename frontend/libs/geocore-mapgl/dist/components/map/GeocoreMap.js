'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = GeocoreMap;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MapFactory = require('./MapFactory');

var _MapFactory2 = _interopRequireDefault(_MapFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GeocoreMap(props) {
    var factory = new _MapFactory2.default(props.config.MAP_DRIVER);

    var MyMapComponent = factory.getMapComponent();
    var translatedMapOptions = factory.translateMapOptions(props.mapOptions);

    return _react2.default.createElement(MyMapComponent, _extends({}, props, {
        mapOptions: translatedMapOptions }));
}