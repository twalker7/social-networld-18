const {Schema, model, Types} = require('mongoose');



const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String, 
            reqiured: true,
            maxlength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            // get:
        },
        username: {
            type: String,
            require: true
        }
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ReactionSchema = new Schema({
    
        reactionId:{
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280
            
        }, 
        username:{
            type: String, 

        },
        createdAt:{
            type: Date,
            default: Date.now
            // get: (dateVal)=> 
        }
    
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtuals()

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;