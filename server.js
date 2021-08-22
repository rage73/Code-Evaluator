const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'));

function decryptText(rawData) {
    let data = rawData.split("");
    for (let i = 0; i < data.length; i++)
    {
        if (data[i] >= 'A' && data[i] <= 'Z')
            data[i] =  String.fromCharCode(data[i].charCodeAt(0) + 'a'.charCodeAt(0) - 'A'.charCodeAt(0));
        else if (data[i] >= 'a' && data[i] <= 'z')
            data[i] =  String.fromCharCode(data[i].charCodeAt(0) + 'A'.charCodeAt(0) - 'a'.charCodeAt(0));
    }
    data = data.join("");
    return data;
}

function decryptQueryParams(req,res,next) {

    for(let q in req.query) {
        let data = decryptText(req.query[q]);
        req.query[q] = data;
    }

    next();
}

function decodeQueryBase64(req,res,next) {
    for (let q in req.query) {
        let data = req.query[q];
        data = Buffer.from(data,'base64').toString('ascii');
        req.query[q] = data;
    }
    next();
}

app.get('/eval', decryptQueryParams, decodeQueryBase64, (req,res) => {
    let result = "Code Result\n";
    for(let q in req.query) {
        let data = req.query[q];
        result = data + "\n";
    }

    res.send(result);
})

app.listen(4545, ()=>{
    console.log('server started at http://localhost:4545');
})