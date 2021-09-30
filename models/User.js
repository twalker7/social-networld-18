const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username :{
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true, 
            unique: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, "please insert a valid email"]

        },
        thoughts: [
                // array of _id values referencing the  thought model 
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought'
                  }
        ],
        friends: [
            // array of _id values that are refereincing the user model -- self ref`
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
              }
        ]
    }, 
    {
        toJSOn:{
            virtuals: true, 
            getters: true,
        },

        id: false // tells mongodb not to create id for subschema
    }
    
);


// add virtual called friendCount that retreves the length of the users friends array field 
        UserSchema.virtual('friendCount').get(function(){
            return this.friends.length; 
            //this is placeholder code and should be revised to be dynamic
        }); 


        const User = model('User', UserSchema);



        module.exports = User;

        