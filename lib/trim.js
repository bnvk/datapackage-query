var _ = require('underscore');

FilterTrim = function(key, arg, line) {
  if (line[key] == arg) {
    return true;
  } else {
    return false;
  }
};

module.exports = FilterTrim;
