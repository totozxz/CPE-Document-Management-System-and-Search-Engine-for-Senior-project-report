const express = require('express');
const route = express.Router()
const fs = require('fs');

const services = require('../services/render');
const controller = require('../controller/controller');


const multer  = require('multer');
var Poster = require('../model/model_Poster');
var Report = require('../model/model_Report');

// Upload File Function
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./File_Collect/${req.body.year}/${req.body.group_number}`;
            if (!fs.existsSync(dir+"/Report")) {
	            fs.mkdirSync(dir+"/Report", {
		             recursive: true
	            });
            }
            if (!fs.existsSync(dir+"/Poster")) {
	            fs.mkdirSync(dir+"/Poster", {
		             recursive: true
	            });
            }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        
        if (file.mimetype === 'application/pdf') {

            var filePath = `Report/${file.originalname}`;
            const report = new Report({
                ReportFile : filePath,
                project_no : req.body.group_number,
                Year : req.body.year
            })
            report
                .save(report)
                .then(() => {
                    cb(null, filePath);
                }); 
        }

        else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

            var filePath2 = `Poster/${file.originalname}`;
            const poster = new Poster({
                PosterFile : filePath2,
                project_no : req.body.group_number,
                Year : req.body.year
            })
            poster
                .save(poster)
                .then(() => {
                    cb(null, filePath2);
                }); 
        }
    }
        
})
const upload = multer({ storage });
//---------------------- End Upload File Function -------------------------

// Call Page
route.get('/',services.homeRoutes);
route.get('/result',services.SearchResult);
route.get('/create',services.Create);
route.get('/update_document',services.update_document);
route.get('/doc_description',services.doc_description);
route.get('/management',services.Management);



// Call API
route.post('/api/create',[upload.fields([
                                            {name: 'file1', maxCount : 1}, 
                                            {name: 'file2', maxCount : 1}
                                        ])],controller.create);
route.get('/api',controller.Search);
route.get('/api/all',controller.All);
route.get('/api/filter',controller.filter);
route.put('/api/:id',controller.update);
route.delete('/api/:id',controller.delete);
route.get('/api/description',controller.doc_description);
route.get('/api/poster',controller.doc_Poster);
route.get('/api/report',controller.doc_Report);
module.exports = route