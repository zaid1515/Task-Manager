const mongoose = require('mongoose');   

// Schema docs: https://mongoosejs.com/docs/guide.html#definition
// https://mongoosejs.com/docs/api/schema.html#Schema.Types
// schema is structure of documents in the collection in mongoDB
// syntax is key:value pairs 
// we set schema for documents inside each collection
/*
const taskSchema=new mongoose.Schema({
    name:String,
    completed:Boolean
    // extra fields _id and _v are added by mongodb by default.
})
*/
// the schema is the structure of document and in the post request in the data sent,the document attributes (fields)mentioned is looked for , means name and completed for the above one, if not found , empty object is created which is a prob(for the above schema setup).
// Also only the fields mentioned in the schema are passed to the db and rest are ignored , if extra fields are passed while creating document

// VALIDATION : IN SCHEMA
// https://mongoosejs.com/docs/validation.html
// the above schema structure accepts empty strings for name , also accepts null object as a document
// So we can add validation why creating the schema , by setting each properties(fields in the schema) as objects.
// if any one of the validation fails , the item is not added
const taskSchema = new mongoose.Schema({
    // required is set true, if we want to add custom msg if not satisfied then we pass as an array as shown below
    // trim is used to eliminate white spaces at start and end of the string 
    name: {
        type: String,
        required: [true, "Task Name is Required"],
        maxlength: [20, "Task Name should be less than 20 characters"],
        trim: true,
        // validate: {
        //     validator: function (v) {
        //         return v.trim().length > 0;
        //     },
        //     message: "Task Name should not be an empty string",
        // },
        // the validate property is used to define a custom validator function that checks if the trimmed name has a length greater than 0.
    },
    completed: {
        type: Boolean,
        default: false,
    }
    // default value is set false for completed , hence we need not sent it while sending new task name
});

// Model docs: https://mongoosejs.com/docs/models.html
// once we have schema , we set up a model based on that schema 
// model is the representation of the collection
// model provides interface to the database
// through the model we can perform operation on that particular collecetion whose model we have created


// mongoose.model(modelName, schema, collectionName, skipInit(not used));
// const User = mongoose.model('User', userSchema);

// can use the below one if collection is already created
// const User = mongoose.model('User', userSchema, 'custom_collection_name');

module.exports=mongoose.model('Tasks',taskSchema)
// we can use the models created here in the controllers to set the callback functions of the routes