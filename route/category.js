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
  

router.delete('/category/:id', auth ,async (req,res,next)=>{
    const cateDeleteId = parseInt(req.params.id);
    let category = await prisma.categories.findUnique({
      where:{
        id : cateDeleteId,
      },
    });
    if(!category){ 
      return res.status(404).json({msg : "Categories not found"})
    }

    const categorie =  await prisma.categories.delete({
      where:{
        id : category.id  
        
      }
    })
    res.json({msg : "Category delete", categorie})
})






  export default router