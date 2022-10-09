const http = require('http') //responses
const path = require('path') //directory and files paths
const fs = require('fs') //Dealing with the files system
const fs_promises=require('fs').promises //File systems with directorys

const logEvents = require('./event_emmitter');
const EventEmmitter = require('events');
class Emitter extends EventEmmitter{};


//initializing object
const my_emmitter = new Emitter()
my_emmitter.on('log',(msg,fileName)=>logEvents(msg,fileName))

//Web Server port
const PORT = process.env.PORT || 3500;

//serve file
const serveFile = async (filePath,contentType,response)=>{
    try{
        const raw_data = await fs_promises.readFile(
            filePath,
            //if the contentType does not include image we use utf8 else we use an empty string
            !contentType.includes('image') ?'utf8':''
            );
        const data = contentType === 'application/json' ? JSON.parse(raw_data):raw_data
        response.writeHead(
            filePath.includes('404.html')? 404 : 200,
            {'Content-Type':contentType}
            )
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        )
    }
    catch(error){
        console.log(error);
        my_emmitter.emit('log',`${error.name}: ${error.message}`,'errLog.txt')
        response.statusCode=500;
        response.end();
    }
}

//Creating a server
const server  = http.createServer((req,res)=>{
    console.log(req.url, req.method)
    my_emmitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt')

    const extension = path.extname(req.url)
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    //Everything that starts with contentType is a condition
    //Everything that starts with path is a result
    let filePath =
    contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url);
    //Makes the .html extension not required in the browser
    //req.url.slice(-1) = returns the last charater in the url
    if(!extension && req.url.slice(-1) !== '/'){
        filePath+='.html'
    }
    //check if we want to serevr the file
    const file_exists = fs.existsSync(filePath)
    if(file_exists){
        //servers file
        serveFile(filePath,contentType,res)
    }
    else{
        //base is the filename and extension eg.old.html
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'})
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location':'/'})
                res.end()
                break
            default:
                //serve a 404 response
                serveFile(path.join(__dirname,'views','404.html'),'text/html',res)
        }
        //404
        //301 redirect
        //console.log(path.parse(filePath));
    }


})

//listening for request
server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})


/*
//add listener for the log event
//a log event
my_emmitter.on('log',(msg)=>logEvents(msg))

setTimeout(()=>{
    //Emit event
    my_emmitter.emit('log','Log event emitted')
},2000)
*/
