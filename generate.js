var tv4 = require('tv4');
var json_schema_faker = require('json-schema-faker');
var _ = require('lodash');

var args = process.argv.slice(2);

if (args.length !== 2) {
  throw new Error("Invalid arguments should be node generate.js [file path] [number of of fakes to make]");
}

var schema = require('./' + args[0]);

var number_of_fakes = args[1];

var fakes = _.map(_.range(number_of_fakes), function () {
  var faked_json = json_schema_faker(schema);

  // Be sure that we've got a valid bit of fake json
  var validation_response = tv4.validateResult(faked_json, schema);
  if (validation_response.error !== null) {
    console.log(faked_json);
    throw new Error(validation_response.error);
  }
  return faked_json;
});

process.stdout.write(JSON.stringify(fakes, null, " ") + '\n');
