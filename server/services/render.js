const axios = require('axios');

// render homepage
exports.homeRoutes = (req,res)=>{
    res.render('index')
}

// render create page
exports.Create = (req,res)=>{
    res.render('create')
}

// render management page
exports.Management = (req,res)=>{
    axios.get('http://localhost:3000/api/filter',{ params : { year: req.query.year }})
        .then(function(Alldata){
            console.log(Alldata)
            res.render('Admin',{docs : Alldata.data},)
        })
        .catch(err =>{
            res.send(err);
        })
}

// render Searching result page
exports.SearchResult = (req,res)=>{
    
    axios.get('http://localhost:3000/api',{ params : { keyword: req.query.keyword , year: req.query.time}})
        .then(function(searchdata){
            console.log(searchdata)
            res.render('Search',{docs : searchdata.data},)
        })
        .catch(err =>{
            res.send(err);
        })
    
}

// render Update data page
exports.update_document = (req,res)=>{
    axios.get('http://localhost:3000/api/description',{params : {id: req.query.id}})
    .then(function(response){
        console.log(response)
        res.render('update',{docs: response.data},)
    })
    .catch(err =>{
        res.send(err);
    })
}
 
// render data description page
exports.doc_description = (req,res)=>{
    axios.get('http://localhost:3000/api/description',{params : {id: req.query.id}})
        .then(function(response){
            console.log(response)
            res.render('doc_des',{docs: response.data},)
        })
        .catch(err =>{
            res.send(err);
        })
}