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

  router.get('/categories/:id',auth,async (req,res,next)=>{
    let category_id = parseInt(req.params.id);
    let categorie = await prisma.categories.findFirst({
      id : category_id
    })
    res.json(categorie)
  })

// route pour crée une catégorie 
router.post('/categories', auth, async(req,res,next)=>{
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
  
// la route pour supprimer une catégorie  
router.delete('/categories/:id', auth ,async (req,res,next)=>{
  // on récupére l'id 
    const cateDeleteId = parseInt(req.params.id);
    let category = await prisma.categories.findUnique({
      where:{
        id : cateDeleteId,
      
      },
    });
    // on va vérifier si la catégorie existe
    if(!category){ 
      return res.status(404).json({msg : "Categories not found"})
    }
    // on supprime la catégorie
    const categorie =  await prisma.categories.delete({
      where:{
        id : category.id   
        
      }
    })
    res.json({msg : "Category delete", categorie})
})






  export default router