import mongoose from 'mongoose';
const conversationSchema = new mongoose. Schema({
    question :{
        type: String
    },
    answer: {
        type : String
    }
})
const ChatSchema = new mongoose.Schema({
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }
    ]
},
{timestamps: true}
)
const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique: true,
    }, 
    password : {
        type: String,
        required: true,
    },
    chats : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    ]

});

export const UserData = mongoose.model("UserData", UserSchema);
export const Chat = mongoose.model("Chat", ChatSchema);
export const Conversation = mongoose.model("Conversation", conversationSchema);