var cheerio = require('cheerio');
var fs = require('fs');
var _ = require('underscore');



module.exports = function (filePath, cb) {  
  var digest = {};
  //read the file and create a digest
  fs.readFile(filePath, 'utf-8', function(err ,data){
      if (!err) {
          var $ = cheerio.load(data);

          var answers = $('.questionRowTbl');
          if (answers.length !==0) {

              answers.each(function(index1, elem) {
                  var obj = {};
                  //local var for holding eah item
                  var id = '';
                  var imgSrc = '';

                  // id = 
                  id = $(this).find('.menu-tbl')
                              .find('tbody')
                              .find('.bold').html();
                  imgSrc = $(this).find('img').attr('src');

                  var imgSrc = imgSrc.slice(imgSrc.indexOf('/')+1);
                  var normaSrc = imgSrc.slice(imgSrc.indexOf('/')+1);

                  digest[id] = normaSrc;
                  
              });//end items.length !== 0)


                if (typeof(cb) === 'function') {
                  if (digest) {
                    cb(null, digest);
                  }else{
                    cb(err);
                  }
                }//if function
          }


      }else{
          console.log('ERROR from digester.js' + err);
          if (typeof(cb) === 'function') {
            cb(err, digest);
          }
      }
  })

}
