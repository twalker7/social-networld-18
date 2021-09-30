const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    
    reactionId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId
    },
    reactionBody:{
        type: String,
        required: 'Please Enter a reaction',
        maxlength: 280
        
    }, 
    username:{
        type: String,
        required: 'Must Enter a name!',
        trim: true

    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (timeCreated)=> moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a')
    }

},
{
    toJSON:{
        getters: true
    },
   
}
);

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String, 
            required: 'Please write your thought',
            maxlength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
             get: (timeCreated)=> moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            trim: true,
            require: true, 
            
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length; 
    
}); 

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;