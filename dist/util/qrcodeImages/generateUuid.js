"use strict";

var _require = require('uuid'),
  uuidv4 = _require.v4;
function generateUUID() {
  return uuidv4(); // Gera um UUID v4
}
module.exports = {
  generateUUID: generateUUID
};