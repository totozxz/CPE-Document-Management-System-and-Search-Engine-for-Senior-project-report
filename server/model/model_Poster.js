var mongoose = require('mongoose');

// Schema of Poster
var PosterSchema = new mongoose.Schema({
    
    PosterFile : {
        type : String,
    },
    project_no : {
        type : String,
    },
    Year : {
        type : String,
    }
},{collection : 'FilePoster'})


module.exports = mongoose.model('Poster', PosterSchema);