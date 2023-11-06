const mongoose = require('mongoose');
// we are using mongoose (object data modleing node.js library) and it's method to work with the cloud database 

const connectDB=(url)=>{
    // mongoose.connect() is a method which returns a promise (can use .then .catch) , it is used to connect the database to the server , db url is passed as a argument 
   return mongoose.connect(url).then(()=>{
    console.log('Connected to DB');
   })
//    if we don't write the above .then , it's fine as we are checking the connection and err in the app.js
}

module.exports=connectDB