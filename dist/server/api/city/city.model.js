'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitySchema = new _mongoose2.default.Schema({
  name: String,
  theater: [String]
});

exports.default = _mongoose2.default.model('citiesdetails', CitySchema);
//# sourceMappingURL=city.model.js.map
