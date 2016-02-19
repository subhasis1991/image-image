var fs = require('fs');
var _ = require('underscore');
var ERR = require('./ERR');
var config = require('./../db/seed/config');

module.exports = function(digested, cb){
  if (config.doseed) {
    var filePath = './data/' + config.stream + config.qsetno + '.json';
    console.log('Trying');
    fs.writeFile(filePath, JSON.stringify(digested), function(err){
      if(err){
        console.log('ERROR :' + 'FILE_WRITE_ERROR');
        console.log(err);
      }
    })
  }


  if (_.isFunction(cb)) {
    cb();
  }
}