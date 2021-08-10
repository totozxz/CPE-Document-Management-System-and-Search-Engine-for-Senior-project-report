var mongoose = require('mongoose');

// Schema of Report
var ReportSchema = new mongoose.Schema({
    
    ReportFile : {
        type : String,
    },
    project_no : {
        type : String,
    },
    Year : {
        type : String,
    }
},{collection : 'FileReport'})

module.exports = mongoose.model('Report', ReportSchema);