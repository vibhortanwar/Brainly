import mongoose, {model,Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo=process.env.MONGO_URL;
if(!mongo){
    throw new Error("Missing MONGO_URL in environment variables");
}
mongoose.connect(mongo);
const UserSchema = new Schema({
    username: {type: String, unique:true},
    password: String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
    authorId: {type: mongoose.Types.ObjectId, ref: 'User', required: true }
})

export const ContentModel = model("Content", ContentSchema);