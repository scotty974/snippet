import express from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import createError from 'http-errors';
import tagValidator from "../tagsValidator.js";

const router = express.Router()
const prisma = new PrismaClient();
const auth = expressjwt({
    secret: process.env["JWT_KEY"],
    algorithms: ["HS256"],
  });  

router.post('/tags', auth, async (req,res,next)=>{
   let tagsData;
   tagsData = tagValidator.parse(req.body)

   const tags = await prisma.tags.create({
    data : {
       name : tagsData.name,
       
    }
   })
   res.json(tags)
})







export default router