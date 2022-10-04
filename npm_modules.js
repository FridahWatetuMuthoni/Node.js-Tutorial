//Adding a package globally and not to a specific project
//npm install nodemon -g

//The process of installing a package to our project
/*
Always make sure to have a .gitignore file so that dependencies are not added to github
1.Initializing npm
    npm init -y
2.installing a package dependency
    npm install date-fns
3.After cloning a project from github always run to install all the project dependencies
    npm install 
4.Adding nodemon as a dev depency
    npm i nodemon -D
5.Add this to the package.json
    "scripts": {
    "start":"node index",
    "dev":"nodemon index"
  }
6. To run your project after adding the above script.run this
    npm run dev

    7.Uninstalling a dev depency
    npm rm nodemon -D
*/
//Using an installed dependency
const {format} = require('date-fns')
console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))


const{v4 : uuid} = require('uuid')
console.log(uuid())