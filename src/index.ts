import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, TagModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import dotenv from "dotenv";
dotenv.config();
const JWT_PASSWORD = process.env.JWT_PASSWORD;
if(!JWT_PASSWORD){
    throw new Error("Missing JWT Password in environment variables")
}

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/api/v1/signup", async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    try{
        await UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message:"User signed up"
        })
    }catch(e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin",async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req,res) => {
    const link = req.body.link;
    const title = req.body.title;
    const tags = req.body.tags;
    const tagId = [];
    for(const tag of tags || []){
        let TAG = await TagModel.findOne({tag});

        if(!TAG){
            TAG = await TagModel.create({tag});
        }
        tagId.push(TAG?._id);
    }
    await ContentModel.create({
        title,
        link,
        //@ts-ignore
        userId:req.userId,
        tags: tagId
    })
    return res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username");
    res.json({
        content
    })
})

app.delete("/api/v1/content", async (req,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req,res) =>{
    const shareable: boolean=req.body.share;
    if(shareable){
        res.json({
            message: "Link"
        })
    }else{
        res.json({
            message:"This is a private link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req,res) =>{
    const {shareLink} = req.params;

    const content = await ContentModel.findOne({
        link:shareLink
    }).populate({
        path: "userId",
        select: "username"
    });

    if(!content){
        res.status(404).json({
            message: "Content not found"
        })
    }
    res.json({
        //@ts-ignore
        username: content?.userId.username,
        content:[{            
            id: content?._id,
            type: content?.type,
            link: content?.link,
            title: content?.title,
            tags: content?.tags,
        }]
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});