var mongoose = require('mongoose');

var ImgSchema = new mongoose.Schema({
    id:     { type: Number},
    cloud:     { 
        public_id: {type: String},
        version: {type: Number},
        signature: {type: String},
        width: {type: Number},
        height: {type: Number},
        format: {type: String},
        resource_type: {type: String},
        created_at: {type: String},
        tags: [],
        bytes: {type: Number},
        type: {type: String},
        etag: {type: String},
        url: {type: String},
        secure_url: {type: String},
        original_filename: {type: String}
    },

    createdOn: { type: Date, default: Date.now },
    modifiedOn:  { type: Date, default: Date.now }
});


mongoose.model('Img', ImgSchema);

