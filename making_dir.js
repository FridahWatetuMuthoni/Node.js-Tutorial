const fs = require('fs')
const path = require('path')

//The code below checks if the file exists and if it does not exists it creates it
//You can check if the file exsists before creating or deleting it
if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if (err) throw err;
        console.log('created new directory')
    })
}
else{
    console.log('File already exists')
}

//If the file exists remove it
if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if (err) throw err;
        console.log('Directory Removed')
    })
}
else{
    console.log('File does not exists hence can not be deleted')
}
