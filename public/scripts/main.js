jQuery(document).ready(function($) {
    var progressBar = $('.bar1'),
        progressBarWrapper = progressBar.parent(),
        formContainer = $('.form-container')
        jumbotron = $('.jumbotron'),
        submit = $('#submit'),
        answer = $('.answer'),
        container = $('.container'),
        loading = $('.loading'),
        attempted = $('.attempted span'),
        right = $('.right span'),
        total = $('.total span'),
        wrong = $('.wrong span'),
        userName = $('.name span'),
        rollno = $('.rollno span'),
        testDate = $('.test-date span'),
        subject = $('.subject span')
        h4 = $('h4');
        h4.hide(),
        list = $('.dropdown ul li')
        caret = $('.caret')
        dropdownToggle = $('.dropdown-toggle');
        alert = $('.alert');
        errorAlert = $('.alert.error');
        
/*    var errMsg = {
        101: 'APP_SERVER_ERR',
        0 : 'TEST',
        1 : 'TEMP_FILE_SAVE_ERR',
        2 : 'WRONG_FILE_TYPE_UPLOADED_ERR',
        3 : 'TEMP_FILE_UNLINK_ERR',
        4 : 'TEMP_FILE_STAT_ERR:',
        5 : 'TEMP_FILE_PATH_NOT_FOUND_ERR',
        6 : 'TEMP_FILE_DIGESTION_ERR',
        7 : 'QUERY_ERR',
        8 : 'QUESTION_NOT_FOUND_ERR',
        9 : 'DATA_NOT_AVAILABLE_ERR',
        10 : 'USER_SEARCH_ERR',
        11 : 'QSET_NOT_AVAILABLE_ERR'
    }*/

    submit.click(function(event) {
        event.preventDefault();
        fileToData = $( 'input[type=file' )[0].files[0];
        
        if (!fileToData) {
            console.error('No file selected')
            return
        }

        var fd = new FormData();
        fd.append('ansFile', fileToData);
        // fd.append('ansFile', fileToData);
          
       $.ajax({
            url: 'file/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function(evt) {
                  if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    
                    // show progress
                    progressBar.width(percentComplete + '%');

                  }
                }, false);

                return xhr;
            },
            success: function ( data, status, xhr) {
                console.log(data);                        
            }//end success

        });//end $.ajax

        //show progress bar
        progressBarWrapper.removeClass('hidden');


    });//end click

});                 

/*
|--------------------------------------------------------------------------
| Data digestion have to be done locally.....
|--------------------------------------------------------------------------
*/

function readFile(file, cb){
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            if ($.isFunction(cb)) {
                cb(evt.target.result);
            }
        }
        reader.onerror = function (evt) {
            console.error("error reading file");
        }
    }
}

//create id: image_src

function digestFile(fileToData, cb){
  var digest = [];

  var fileRead;
  readFile(fileToData, function(fileDataString){
    //first remove img tags

    var $data = $(fileDataString);

    var answers = $data.find('table.menu-tbl');

    if (answers.length !==0) {
    var items = answers.find('tbody');
      if (items.length !== 0) {
        items.each(function(index1, elem) {
            //local var for holding eah item
            var item = {};
            var id;
            $(this).find('tr').each(function(index2, el) {

               //process the text then push
               var text = $(this).text();
               var indexOfDivider = text.indexOf(':');
               var key = text.slice(0,indexOfDivider).replace(/\s/g, '');
               var val = text.slice(indexOfDivider+1,text.length).replace(/\s/g, '');
               item[key] = val;

               if (id == 664592445) {
                  console.log('-----------------------');
               }

               if (index2 ===1) {
                digest.push(item);
               }else if (index2 ===0) {
                 id = key;
               }
            });
            
        });//end each
      
      }//end items.length
    }

    console.log(digest[1]);




  });//--------------------------------

}