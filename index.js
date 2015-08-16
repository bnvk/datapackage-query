var fs      = require("fs");
var _       = require('underscore');
var moment  = require('moment');
var path    = require('path');
var csv     = require('csv');

var Query = {};

Query.Recipe = require('./lib/recipe.js');
Query.Filter = require('./lib/filter.js');

Query.options =  {
  search: '',
  format: [],
  trim: '',
  date: ''
}


// Load Data & Parse
Query.Twirl = function(data_path, resource, args, callback) {

  console.log('Twirl CSV resource: ' + data_path + '/' + resource.path + ' with args: ');
  console.log(args);

  Query.Recipe.readManuscript(data_path + '/' + resource.path)
    .then(function(buffer) {

      var csv_data    = buffer.toString("utf8", 0, buffer.length);
      var csv_to_json = [];
      var fields      = _.pluck(resource.schema.fields, 'name');

      // Sanitize Args
      var allowed_args= _.union(fields, ['search']);

      // Turn CSV Data into array, then map + add to output
      csv.parse(csv_data, function(err, csv_object) {

        // Remove first line if matches schema
        if (fields.join(',') == csv_object[0].join(',')) {
        	csv_object.splice(0, 1);
        }

        _.each(csv_object, function(csv_line, key) {
          var json_line = _.object(fields, csv_line);

          if (Query.Filter(resource.schema, allowed_args, args, json_line)) {
            csv_to_json.push(json_line);
          }
        });

        return callback(csv_to_json);
      });

    }).catch(function(error) {
      console.log("Error while Twirling: ", error);
      if (callback) return callback(Error);
    });
};


// Load JSON Schema
Query.Grow = function(schema_path, callback) {

  Query.Recipe.readManuscript(schema_path)
    .then(function(buffer) {

      var json = buffer.toString("utf8", 0, buffer.length);
      var schema = JSON.parse(json);

      console.log('Loaded JSON schema: ' + schema.name);
      return callback(schema);

    }).catch(function(error) {
      console.log(error);
    });
};


module.exports = Query;
