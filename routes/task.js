const express = require('express'); 
const router=express.Router()
const {getallTask,createTask,getTask,updateTask,deleteTask}=require('../controllers/taskcontrol')


router.route('/').get(getallTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router;