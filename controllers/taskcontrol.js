// this file is to set up the callback functions of all the routes starting with /api/task  the routes are in /routes/tasks.js

const tasks = require('../models/TaskSchema')

// there are queries in mongoose which are quite helpful to perform CRUD opertaions to the database.
// https://mongoosejs.com/docs/queries.html
// QUERIES ARE NOT PROMISES , THEY ARE THENABLES.
// A "thenable" is an object that has a .then() method and can be used with async/await to work with asynchronous code.

// https://mongoosejs.com/docs/api/query.html
// there are a lot of query helper functions as well to help perform the query according to our need. each of these function return a mongoose query object

// so as queries are thenables we can use await-async(along with try catch)
// (await works with any object with then method , await is used to pause execution of that function till promise is resolved or rejected) 

const getallTask = async (req, res) => {
    // model.find({object}) is used to fetch data matching the object passed , if nothing passed as object then all data is fetched. 
    try {
        const alltasks = await tasks.find({})
        res.status(200).json({ alltasks })
        console.log('Fetched All Tasks');
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const createTask = async (req, res) => {
    try {

        // we use modelname.create({document}) syntax to create a document in the collection 'modelname
        const task = await tasks.create(req.body)
        // thro' the above line a new document is added to the collection named tasks in the db, as tasks model and schema was formed in the taskSchema.js 

        res.status(201).json({ success: true, task: task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const getTask = async (req, res) => {
    try {
        // if we want to find data based on some particular property,then we can use findOne({object}) function to return the query
        // if you specifically want to filter data based on ID , then there's another method findByID(direct id )
        // const {id:taskID}= req.params
        // const task=await tasks.findOne({_id:req.params.id})
        const task = await tasks.findById(req.params.id)
        if (!task) {
            res.status(404).json({ msg: `No task with id : ${id}` })
        }
        else {
            res.status(200).json({ task })
        }

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        // const taskId = req.params.id;
        const { id: taskId } = req.params;
        // const task= await tasks.findOneAndUpdate({_id:taskId})
        const task = await tasks.findByIdAndUpdate(taskId, req.body,{
            new:true,
            runValidators:true,
        })
        // so the findByIdAndUpdate(taskId, req.body) method returns the old item and updates it,if we want it to return the updated value , we need to add additional OPTIONS(3rd argument) as arguments
        // also the validations set for the schema are not set for updation by default and they need to be set explicitly
        res.status(200).json({task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        // similar to get we have two differents methods if we want to delete using id
        // const task = await tasks.findByIdAndDelete(taskId);
        const task = await tasks.findOneAndDelete(taskId);

        if (!task) {
            res.status(404).json({ msg: "No such task" });
        } 
        else {
            res.status(200).json({ success: true, msg: "Task Deleted", deleted_task: task });
        }

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = { getallTask, createTask, getTask, updateTask, deleteTask }