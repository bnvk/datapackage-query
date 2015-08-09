var _         = require('underscore');
var moment    = require('moment');

FilterDate    = require('./date.js');
FilterTrim    = require('./trim.js');
FilterSearch  = require('./search.js');

Filter = function(schema_fields, data) {

  // Filter by Date / Type
  var date_filter = 'none';

  if (date !== undefined) {

    // TODO: would it be easier to just use moment.js for this?
    var is_date_full        = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    var is_date_year_month  = /[0-9]{4}-[0-9]{2}/;
    var is_date_month_day   = /[0-9]{2}-[0-9]{2}/;
    var is_date_year        = /[0-9]{4}/;
    var is_week             = /week/;
    var is_month            = /month/;
    var is_today            = /today/;

    if (is_week.exec(date)) {
      date_filter = 'this_week';
    } else if (is_today.exec(date)) {
      date_filter = 'today';
    } else if (is_month.exec(date)) {
      date_filter = 'this_month';
    } else if (is_date_full.exec(date)) {
      date_filter = 'full';
    } else if (is_date_year_month.exec(date)) {
      date_filter = 'year_month';
    } else if (is_date_month_day.exec(date)) {
      date_filter = 'month_day';
    } else if (is_date_year.exec(date)) {
      date_filter = 'year';
    } else {
      date_filter = 'month';
    }

  }


  // Filter Date & Trim
  var check_date    = Conjuror.Date[date_filter](parts[0], date);
  var check_trim    = Conjuror.Trim(Conjuror.options.trim, parts);
  var check_search  = Conjuror.Search(parts, Conjuror.options.search);

  // Does Item Meet Filter (date, trim)
  if (_.indexOf([check_date, check_trim, check_search], false) === -1) {

    var item_output = Conjuror.murmurLineToSchema(line, schema);
    increment_output(item_output);
  }

  return outputs;
}

module.exports = Filter;