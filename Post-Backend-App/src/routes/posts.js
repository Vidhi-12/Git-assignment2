const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
const Post = require("../models/Posts");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "RESTAPI";
const router = express.Router();


app.use("/posts", (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        // console.log("Verify token");
        if (token) {        // verify a token symmetric
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    })
                }
                req.user = decoded.data;
                next();
            });
        } else {
            return res.status(403).json({
                status: "failed",
                message: "Invalid token"
            })
        }
    }else {
        return res.status(403).json({ status: "Failed", 
        message : "Not authenticated user"});
    }
})


router.post("/posts", async (req, res) => {
    try{
        const data = await Post.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            user: req.user
        });
        res.status(200).json({
            status: "Post created",
            data
    
        })

    }catch(e){
        res.status(400).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.get("/posts", async (req, res) => {
    // write the code to fetch posts
    try{

        const posts = await Post.find();
        res.json({
            status: "Success",
            posts
        })
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.put("/posts/:postId", async (req, res) => {
    // write the code to fetch posts
    try{
        const userPost = await Post.findOne({$and : [{user: req.user},{ _id: req.params.id}]});

        if(userPost){
            const posts = await Post.updateOne({_id: req.params.id}, req.body);
            res.json({
                status: "Success"
            })
        }else {
            res.status(401).json({
                status: "Failed",
                message: "User is not authorised to make changes in this post"
            })
        }

    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.delete("/posts/:postId", async (req, res) => {
    try{
        const userPost = await Post.findOne({$and : [{user: req.user},{ _id: req.params.id}]});

        if(userPost){
            const posts = await Post.deleteOne({_id: req.params.id});
            res.json({
                status: "Successfully Deleted"
            })
        }else {
            res.status(401).json({
                status: "Failed",
                message: "User is not authorised to make changes in this post"
            })
        }

    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});
module.exports = router;