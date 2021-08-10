const mongoosastic = require('mongoosastic')
const mongoose     = require('mongoose')
var Document = require('../model/model_Doc');
var Poster = require('../model/model_Poster');
var Report = require('../model/model_Report');
const Fuse = require('fuse.js')
var fs = require('fs');
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
    hosts: ["http://localhost:9200"]
  });
const multer  = require('multer');
const { noConflict } = require('jquery');


// Mapping data in mongoDB to Elasticsearch //
Document.synchronize();
Document.createMapping(function(err, mapping) {
    if (err) {
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    } else {
      console.log('mapping created!');
      console.log(mapping);
    }
});
//---------------------- End Mapping Part ------------------------- //

// Use to get All data to check year in Database use on dropdown manu on search function
exports.All = (req,res) =>{
    
    Document.find()
        .then(doc =>{
            res.send(doc)
        })
        .catch(err =>{
            res.status(500).send({
            message : err.message || "some error occurred while reading operation"});
        });  
    
}
//---------------------- End ------------------------- //

// filter data by year on management page //
exports.filter = (req,res) =>{
    var year = req.query.year;
    if( year == "All"){
        Document.find()
        .then(doc =>{
            res.send(doc)
        })
        .catch(err =>{
            res.status(500).send({
            message : err.message || "some error occurred while reading operation"});
        });  
    }
    else{
        Document.find({Year : year})
        .then(doc =>{
            res.send(doc)
        })
        .catch(err =>{
            res.status(500).send({
            message : err.message || "some error occurred while reading operation"});
        });  
    }   
}
//---------------------- End ------------------------- //

// create and save new Document data //
exports.create = (req,res) =>{
    
    if(!req.body){
        res.status(400).send({message : "Content can not be emtpy!"})
        return;
    }
    
    var tags = req.body.All_tags.split(",");

    const doc = new Document({
        project_no : req.body.group_number,
        project_title : req.body.title,
        Member: req.body.member,
        Advisor : req.body.advisor,
        Co_Advisor : req.body.co_advisor,
        Year : req.body.year,
        Tags : tags,
        Views : 0
        
    })
    

    doc
        .save(doc)
        .then(data => {
            
            res.redirect('/management?year=All')
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "some error occurred while creating operation"
            });
        });
        
}
//---------------------- End Create API ------------------------- //

// Searching Function //
exports.Search = (req,res) =>{
    var keyword = req.query.keyword;
    var year = req.query.year;

    Document.synchronize();

    if (year == "All") {
        if (keyword == "All") {
            Document.find()
            .then(doc =>{
                res.send(doc)
            })
            .catch(err =>{
                res.status(500).send({
                message : err.message || "some error occurred while reading operation"});
            });
        }
        else {
            Document.search({
                "bool": {
                    "must": [ 
                        {
                            multi_match: 
                                {
                                query: keyword,
                                fuzziness: 4 
                                }
                        }
                    ]
                }   
            },{ hydrate:true }
            , function(err, doc) {
            // results here
                if (err) {
                    console.log(err) // Pass errors to Express.
                } 
                else {
                    res.send(doc.hits.hits)
                    
                }   
            });
        }
        
    } 
    else if (year != "All") {
        if (keyword == "All") {
            Document.find({Year : year})
            .then(doc =>{
                res.send(doc)    
            }) 
            .catch(err =>{
                res.status(500).send({
                message : err.message || "some error occurred while reading operation"});
            });
        }
        else {
            Document.search({
                "bool": {
                    "must": [ 
                        {
                            multi_match: 
                                {
                                query: keyword, 
                                fuzziness: 4 
                                }
                        }
                    ],
                    "filter": [ 
                        { 
                            "term": { "Year": year }
                        }
                    ]
    
                } 
            },{ hydrate:true }
            , function(err, doc) {
            // results here
                if (err) {
                    console.log(err) // Pass errors to Express.
                } 
                else {
                    res.send(doc.hits.hits)
                    
                } 
            });
        }
        
    } 
}
//---------------------- End Searching API ------------------------- //

// Update data Function //
exports.update = (req,res) =>{

    if(!req.body){
        res.status(400).send({message : "Data to update can not be emtpy!"})
        return;
    }

    const id = req.params.id;
    Document.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message : 'Cannot Update'})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error Update"});
        });
    
}
//--------------------- End Update API -------------------------- //

// Delete Function //
exports.delete = (req,res) =>{

    const id = req.params.id;  
    
    Document.findById(id, function(err, doc) {
        console.log(doc);
        var year = doc.Year;
        var num = doc.project_no;
       
        Poster.findOne({Year: year, project_no : num})
        .then(pos =>{
            var Path = "./File_Collect/"+year+"/"+num+"/"+pos.PosterFile+"";
            console.log(Path);
            fs.unlink(Path, (err) => {
                if (err) {
                    throw err;
                }});
            pos.delete();
        });
        Report.findOne({Year: year, project_no : num})
        .then(rep =>{
            var Path = "./File_Collect/"+year+"/"+num+"/"+rep.ReportFile+"";
            console.log(Path);
            fs.unlink(Path, (err) => {
                if (err) {
                    throw err;
                }});
            rep.delete();
        });        
	doc.remove(function(err, doc) {
            if (err) {
                res.status(404).send({message : 'Cannot Delete'})
            }
            else{
                res.send({message : "Delete successfully!"})
            }                
        });
    });
    
}
//---------------------- End Delete API ------------------------- //

// Get Data to show on Description page //
exports.doc_description = (req,res) =>{

    const id = req.query.id;
    
   
   Document.findById(id)

   .then(doc =>{
       res.send(doc)
   })
   .catch(err =>{
       res.status(500).send({
           message : err.message || "some error occurred while reading operation"});
   });
}
//----------------------- End ------------------------ //

// Get Poster Data //
exports.doc_Poster = (req,res) =>{

    const year = req.query.year;
    const num = req.query.number;
   
   Poster.findOne({Year: year, project_no : num})

   .then(pos =>{
       res.send(pos)
   })
   .catch(err =>{
       res.status(500).send({
           message : err.message || "some error occurred while reading operation"});
   });
}
//---------------------- End ------------------------- //

// Get Report Data //
exports.doc_Report = (req,res) =>{

    const year = req.query.year;
    const num = req.query.number;
   
    Report.findOne({Year: year, project_no : num})

   .then(rep =>{
       res.send(rep)
   })
   .catch(err =>{
       res.status(500).send({
           message : err.message || "some error occurred while reading operation"});
   });
}
//--------------------- End -------------------------- //