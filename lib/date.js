var _ = require('underscore');
var moment = require('moment');

var FilterDate = function(date) {

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
      date_type = 'this_week';
    } else if (is_today.exec(date)) {
      date_type = 'today';
    } else if (is_month.exec(date)) {
      date_type = 'this_month';
    } else if (is_date_full.exec(date)) {
      date_type = 'full';
    } else if (is_date_year_month.exec(date)) {
      date_type = 'year_month';
    } else if (is_date_month_day.exec(date)) {
      date_type = 'month_day';
    } else if (is_date_year.exec(date)) {
      date_type = 'year';
    } else {
      date_type = 'month';
    }
  }
  return date_type;
};



FilterDate.full = function(date, dateArg) {

  var this_date = date.replace(/-/g,'');
  var filter_date = dateArg.replace(/-/g, '');

  if (this_date >= filter_date) {
    //console.log('this date: 'this_date + ' is greater than filter date: ' + filter_date);
    return true;
  } else {
    return false;
  }
};

FilterDate.year_month = function(date, dateArg) {

  if (date.indexOf(dateArg) > -1) {
    //console.log('date filter by year_month ' + date);
    return true;
  } else {
    return false;
  }
};

FilterDate.month_day = function(date, dateArg) {

  if (date.indexOf(dateArg) > -1) {
    //console.log('date filter by month_day ' + date);
    return true;
  } else {
    return false;
  }
};

FilterDate.year = function(date, dateArg) {

  if (date.indexOf(dateArg) > -1) {
    //console.log('date filter by year ' + date);
    return true;
  } else {
    return false;
  }
};

FilterDate.month = function(date, dateArg) {
  // looks for the month in the supplied arg
  // console.log(date, dateArg)
  var date_trim = dateArg.toLowerCase();
  var date_full = moment(date).format('MMMM').toLowerCase();
  var date_abbr = moment(date).format('MMM').toLowerCase();
  var date_numb = moment(date).format('MM').toLowerCase();

  if (_.indexOf([date_full, date_abbr, date_numb], date_trim) > -1) {
    //console.log('date matches filter: ' + date_trim)
    return true;
  } else {
    return false;
  }
};

FilterDate.today = function(date, dateArg) {
  return moment(date).dayOfYear() == moment().dayOfYear() && moment(date).year() == moment().year()
}

FilterDate.this_week = function(date, dateArg) {
  return moment(date).week() == moment().week() && moment(date).year() == moment().year()
}

FilterDate.this_month = function(date, dateArg) {
  return moment(date).month() == moment().month() && moment(date).year() == moment().year()
}

FilterDate.none = function(parts) {
  // I uncommented this because it just spouts the same thing over and over
  // again.
  // console.log('no date filtering performed');
};

module.exports = FilterDate;
