//DEALING WITH FILES
//USING PROMISES
//We are using promises to avoid he callback hell that we encountered in when using callbacks in files

const fsPromises = require('fs').promises
const path = require('path')

const fileOperations = async ()=>{
    try{
        //Reading a File
        const data = await fsPromises.readFile(path.join(__dirname,'files','read_file.txt'),'utf8')
        console.log(data)

        //Deleting the file
        await fsPromises.unlink(path.join(__dirname,'files','read_file.txt'))


        //Writing a File
        await fsPromises.writeFile(path.join(__dirname,'files','writing_file.txt'),data)

        //Appending a File
        await fsPromises.appendFile(path.join(__dirname,'files','writing_file.txt'),'\n\n Appending new data to the exiting file')

        //Renaming a File
        await fsPromises.rename(path.join(__dirname,'files','writing_file.txt'),path.join(__dirname,'files','renamed_writing_file.txt'))

        //Reading data from the new renamed and updated file
        const new_data = await fsPromises.readFile(path.join(__dirname,'files','renamed_writing_file.txt'),'utf8')
        console.log(new_data)

    }
    catch (err){
        console.error(err)
    }
}

fileOperations()