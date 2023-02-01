import express from "express";

import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import createError from 'http-errors';
import catValidation from "../catZod.js";

const router = express.Router()
const prisma = new PrismaClient();
const auth = expressjwt({
    secret: process.env["JWT_KEY"],
    algorithms: ["HS256"],
  });  

router.post('/category', auth, async(req,res,next)=>{
    let categoryData;
    categoryData = catValidation.parse(req.body);
  
  await prisma.categories.create({
    data:{
        name: categoryData.name
    }
  }).then((category)=>{
    res.json({"Vous avez crée la catégorie :" : {category}})
  })
})
  






  export default router