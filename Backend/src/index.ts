import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, TagModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import dotenv from "dotenv";
import { random } from "./utils";
import ts from "typescript";
import cors from "cors";
dotenv.config();
const JWT_PASSWORD = process.env.JWT_PASSWORD;
if(!JWT_PASSWORD){
    throw new Error("Missing JWT Password in environment variables")
}

const app = express();
const PORT = 3000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

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

app.delete("/api/v1/content", userMiddleware, async (req,res) => {
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
    const share = req.body.share;
    //@ts-ignore
    const userId = req.userId;
    if(share){
        const existingLink = await LinkModel.findOne({
            userId: userId
        });
        const hash = random(10);
        if(existingLink){
            res.json({
                message: existingLink.hash
            })
        }else{
            const hash = random(10);
            await LinkModel.create({
                userId: userId,
                hash: hash
            })
            res.json({
                message: hash
            })
        }
    }else{
        await LinkModel.deleteOne({
            userId: userId
        });
        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req,res) =>{
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            message: "Content not found"
        })
        return;
    }
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message: "User not found"
        })
        return;
    }
    res.json({
        username: user.username,
        content: content
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});