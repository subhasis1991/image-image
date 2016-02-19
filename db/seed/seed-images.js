var cloudinary = require('cloudinary');
var config = require('./config');
var _ = require('underscore');
var fs = require('fs');

var fileName = config.stream + config.qsetno + '.json';

var filePath = './../../data/' + fileName;

require('./../Img');
var mongoose = require('mongoose');
var Img = mongoose.model('Img');
var ifile = require(filePath);
var gconfig = require('./../../config/config');

//save file to cloudinary and 
//save cloudinary url to cloud data/folder


//connect mongodb
if (gconfig.ENV == "DEV") {
    var mongoConnect = require('./../../config/connection-dev');
}else if(config.ENV == "PRODUCTION"){
    var mongoConnect = require('./../../config/connection-prod');
}

cloudinary.config({ 
  cloud_name: 'dgtuutq2l', 
  api_key: '332538827872532', 
  api_secret: 'mnCsVX9gvCeoXRgjqdGvbhR08Sg' 
});


var savedCount = 0;
var preExists = 0;
var destFileData = {};

_.each(ifile, function(data, index) {
  var actualImgPath = './../../images/' + data;

  // if (count < 1){


    Img.findOne({id: index}, function(err, doc){
      if (err) {
        console.log(err);
      }else if (doc) {
        //already save in cloud
        console.log('DATA_EXISTS_IN_CLOUD');
        preExists++;
        console.log('Image already exists :' + preExists);
      }else{
        //uploading images
        cloudinary.uploader.upload(actualImgPath, function(result) { 
          console.log(index +': '+ result.url);

          //save data to mongo server
          saveToMongo(result, index);
        });
      }
      
    });//end mongo findOne
  

  // }//end if

});

function saveToMongo(result, index){
  var img = new Img({
    id : index,
    cloud: result
  })

  img.save(function (err){
    if (err) {
      console.log('ERR :' +'MONGO_SAVE_ERR');
      console.log(err);
    }else{
      console.log('\nSAVED_QID_IMG :' + index);
      savedCount++;
      console.log('Images saved :' + savedCount);
    }
  })

}