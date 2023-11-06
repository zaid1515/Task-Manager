console.log('Task Manager App');

const express=require('express')
const app=express()
const port=5000
const task=require('./routes/task')
const connectDB=require('./db/connect')
const dotenv = require('dotenv').config();
// as we are using .env file for the MONGO_URI , we need to add the above package in app.js
// .config() is a method provided by dotenv that loads the environment variables from the .env file in your project's root directory and adds them to process.env


// middleware - parse incoming json and store in req.body 
app.use(express.static('./public'))
app.use(express.json())


// routes
// app.get('/apptest',(req,res)=>{
//     res.send('Task Manager Application')
// })

// This line accepts all HTTP requests that start with '/api/task' and routes them to the 'task' variable,which is an instance of the Express Router. , where the callback function to resolve each route is written in the file inside the controllers folder
app.use('/api/task',task)
// --- api/v1(version1)/tasks  is a convention as we will be having other routes as well
// app.get('api/task')         - get all tasks
// app.post('api/task')        - create new task
// app.get('/api/task/:id')    - get single task
// app.patch('api/task/:id')   - update task
// app.delete('api/task/:id)   - delete task


// we invoke the connectDB function written in connect.js below , so that our server starts listening to requests only once we are connected to the DB.
// async-await should be used along with try-catch block
const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening to port ${port}...`));
    } catch (e) {
        console.log(e);
    }
}

start()