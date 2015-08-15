var _ = require('underscore');

FilterSearch = function(term, line) {

  var line_string = _.values(line).join(' ');
  var line_ready = line_string.toLowerCase();

  if (line_ready.indexOf(term.toLowerCase()) > -1) {
    return true;
  } else {
    return false;
  }
};

module.exports = FilterSearch;
