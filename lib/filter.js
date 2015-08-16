var _         = require('underscore');
var moment    = require('moment');

FilterDate    = require('./date.js');
FilterTrim    = require('./trim.js');
FilterSearch  = require('./search.js');

Filter = function(schema, allowed_args, args, line) {

  // Set All as Failing
  var check_date = [];
  var check_trim = [];
  var check_search = [];

  // Check Schema item for arg to determine "type" of
  // filters which parser is able to perform
  _.each(args, function(arg, key) {

    if (key == 'search') {

      check_search.push(FilterSearch(arg, line));

    } else if (_.indexOf(allowed_args, key) > -1) {

      var field = _.findWhere(schema.fields, { name: key });

      // Filter Date
      if (field.type == 'date') {

        // var date_filter = FilterDate.Determine(date);
        // var check_date    = FilterDate[date_filter](parts[0], date);
        var date_type = FilterDate(arg);
        check_date = FilterDate[date_type](data, arg);

      } else if (field.type == 'string') {

        check_trim.push(FilterTrim(key, arg, line));

      } else if (field.type == 'number') {
      console.log('filtering by number not supported yet')
      // Should offer things like "before:2015" or "after:2013"
      } else {
        console.log('field is not "search" and not defined in schema')
      }

    }
  });

  // Does Item Meet Filter (date, trim)
  if (_.indexOf(check_trim, false) === -1 &&
      _.indexOf(check_search, false) === -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = Filter;
