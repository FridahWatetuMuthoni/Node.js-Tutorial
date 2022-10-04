const fs = require('fs')
const path = require('path')

//readable stream
const read_stream = fs.createReadStream(path.join(__dirname,'files','largefile.txt'),{encoding:'utf-8'})

const write_stream= fs.createWriteStream(path.join(__dirname,'files','newlargefile.txt'))

//Listening for data coming from the stream
//Method One:
/*read_stream.on('data',(dataChunk)=>{
    write_stream.write(dataChunk)
})*/

//Method Two:
read_stream.pipe(write_stream)