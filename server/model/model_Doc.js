var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic')
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    hosts: [ 'localhost:9200']
 });

// Schema of Document
var Doc_schema = new mongoose.Schema({
    project_no : {
        type : String,
        required : true
    },
    project_title : {
        type : String,
        required : true
    },
    Advisor : {
        type : String,
        required : true
    },
    Co_Advisor : {
        type : String,
        required : false
    },
    Member : {
        type : Array,
        es_type:'string',
        required : true
    },
    Year : {
        type : String,
        required : true
    },
    Tags : {
        type : Array,
        es_type:'string',
        required : false
    },
    Views : {
        type : Number,
        required : false
    }
},{collection : 'Document'})


//mongoose test
Doc_schema.plugin(mongoosastic,{
    hosts: ['localhost:9200']
});

//------------
module.exports = mongoose.model('Document',Doc_schema);
