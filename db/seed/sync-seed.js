require('./../Img');
require('./../Answer');
require('./../AnsSet');

var mongoose = require('mongoose');
var _ = require('underscore');

var Img = mongoose.model('Img');
var Answer = mongoose.model('Answer');
var AnsSet = mongoose.model('AnsSet');

var config = require('./config');
var gconfig = require('./../../config/config');

//connect mongodb
if (gconfig.ENV == "DEV") {
    var mongoConnect = require('./../../config/connection-dev');
}else if(config.ENV == "PRODUCTION"){
    var mongoConnect = require('./../../config/connection-prod');
}

var qset = {
    stream: config.stream,
    qsetno: config.qsetno
}

//now sync Answer with cloud image src

Img.find({}, function(err, docs){
    if (!err) {
        //
        console.log('FOUND IMAGES : ' + docs.length);
        console.log('Trying to update answers');
        if (docs.length !==0) {
            updateAnswer(docs);
        }

    }else{
        console.log(err);   
    }
});

var count = 0;
var max = 0;
function updateAnswer(docs){
  max = docs.length;
  _.each(docs, function(imgdoc, index){
      if (count < 1) {
      Answer.update({id: imgdoc.id},{img_src : imgdoc.cloud.url}, {}, function(err, doc){
        if (!err) {
          //update image to Answer doc
          console.log('\nUPDATED IMAGE FOR :' + imgdoc.id );
        }else{
            console.log(err);
        }
      });
    }else if(count === max){
      console.log('EXIT COUNT');
      mongoConnect.close();
    }
    count++;
  });

}