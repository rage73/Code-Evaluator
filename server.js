const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'));

function decryptQueryParams(req,res,next) {
    next();
}

function decodeQueryBase64(req,res,next) {
    next();
}

app.get('/eval', decryptQueryParams, decodeQueryBase64, (req,res) => {
    console.log(req.query);
    res.send('!!result!!');
})

app.listen(4545, ()=>{
    console.log('server started at http://localhost:4545');
})