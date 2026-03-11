import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true ,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength : 6,
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

userSchema.pre('save', async function () {
    if (!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}
const User = mongoose.model('User' , userSchema)

export default User