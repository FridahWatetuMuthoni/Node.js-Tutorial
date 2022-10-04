//DEALING WITH FILES
//USING CALLBACK
//(Read,Write,Update and Delete files in Node.js using the file system CommonJS Module)
//The files are read after everything has been ran
const fs = require('fs')
const path = require('path')

//READING FILES
//Using path instead of hard coding it
/*
HAND CODED FILE NAME
fs.readFile('./files/text_file_1.txt','utf8',(err,data)=>{
    if (err) throw err;
    console.log(data)
})
*/
fs.readFile(path.join(__dirname,'files','read_file.txt'),'utf8',(err,data)=>{
    if (err) throw err;
    console.log(data)
})
//catching any uncaught exceptions and exit
process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error while reading: ${err}`)
    process.exit(1)
})

//WRITING FILES ('utf8' format by default)
//Adding the append file inside the write file callback is to make sure
//that the file is written and created first before we update it
//The original order is write,append,read
//With including it in the callback you controll the flow of the code
//In this code the order of code is Read,Append,Rename

fs.writeFile(path.join(__dirname,'files','write_file.txt'),'Nice to meet You',(err)=>{
    if (err) throw err;
    console.log('Operation writing complete')

    fs.appendFile(path.join(__dirname,'files','write_file.txt'),'\n\nAdding more info to file without replacing the original content',(err)=>{
        if (err) throw err;
        console.log('Operation appending complete')

        //Renaming the file name
        fs.rename(path.join(__dirname,'files','write_file.txt'),path.join(__dirname,'files','new_write_file.txt'),(err)=>{
            if (err) throw err;
            console.log('Operation renaming file complete')
        })
    })
})
//catching any uncaught exceptions and exit
process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error while writing: ${err}`)
    process.exit(1)
})

//UPDATING/APPENDING A FILE
//appending can either modifly an existing file or create a new one if its not available
fs.appendFile(path.join(__dirname,'files','update_file.txt'),'Creating a new file if it does not exist while updating a file',(err)=>{
    if (err) throw err;
    console.log('Operation appending complete')
})
//catching any uncaught exceptions and exit
process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error while apppending: ${err}`)
    process.exit(1)
})

