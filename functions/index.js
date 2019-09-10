const fs = require('fs');
const path = require('path');
const route = require('./functions/route')
const stations = require('./functions/stations')

exports.route = route
exports.stations = stations