import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String , 
        trim : true ,
    },
    image: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    // status: {
    // type: String,
    // enum: ["sent", "delivered", "read"],
    // default: "sent"
    // },
},{timestamps:true})

messageSchema.pre("validate", function (next) {
    if (!this.text?.trim() && !this.image) {
        return next(new Error("Message must have text or image"));
    }
    next();
});

messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

const Message = mongoose.model("Message" , messageSchema)

export default Message