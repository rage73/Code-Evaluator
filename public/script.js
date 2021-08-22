let inpCode = document.getElementById('inpCode');
let btnEncode = document.getElementById('btnEncode');
let btnEncrypt = document.getElementById('btnEncrypt');

let code = document.getElementById('code');

btnEncode.onclick = function () {
    let data = inpCode.value; 
    data = btoa(data);
    code.value = data;
};

btnEncrypt.onclick = function () {
    let data = code.value;
    data = encryptData(data);
    code.value = data;
};

function encryptData(rawData) {
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