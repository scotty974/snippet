import express from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import createError from 'http-errors';
import snippetValidation from "../snippetZod.js";

const router = express.Router()
const prisma = new PrismaClient();

const auth = expressjwt({
    secret: process.env["JWT_KEY"],
    algorithms: ["HS256"],
  });  

  router.get('/snippets/:id', auth, async(req,res,next)=>{
    let snippet_id = parseInt(req.params.id)
     let snippet = await prisma.snippets.findFirst({
      where:{
        id: snippet_id,
        user_id: req.auth.id
      }
     })
     res.json(snippet)
  })




  // la route pour crée un snippet avec une authentification obligatoire
  router.post('/snippets', auth, async(req,res,next)=>{
    let snippetData;
    snippetData = snippetValidation.parse(req.body)
    
   const snipet = await prisma.snippets.create({
    data:{
      
      title: snippetData.title,
      content : snippetData.content,
      category: {
        connect: {
          id: snippetData.category_id
        },
      },
      user: {
        connect:{
          id : req.auth.id
        }
      },
      tags:{
        connect:
          snippetData.tags.map((id)=>{
            return {id}
          })
        
      }
    }

    })
    res.json(snipet) 
  })
 // route pour modifier un snippet 
  router.patch('/snippets/:id', auth, async (req,res,next)=>{
    let snippetData;
     const newSnippet = snippetData = snippetValidation.parse(req.body)

    await prisma.snippets.update({
      where:{
        id : parseInt(req.params.id)
      },
      data:{
      
        title: snippetData.title,
        content : snippetData.content,
        category: {
          connect: {
            id: snippetData.category_id
          },
        },
        user: {
          connect:{
            id : req.auth.id
          }
        },
        tags:{
          connect:{
            id : snippetData.id
          }
        }
      }
      
    })
    res.json(newSnippet)
  })
// la route pour supprimer un snippet avec un id 
router.delete('/snippets/:id', auth, async(req,res, next)=>{
  const snipetDeletId = parseInt(req.params.id);
  console.log(snipetDeletId)
  let snippet = await prisma.snippets.findFirst({
    where:{
      id : snipetDeletId
    }
  });
  if(!snippet){
    return res.status(404).json({msg : "Snippet not found"})
  }
  const snipet = await prisma.snippets.delete({
    where:{
      id : snippet.id
    }
  })
  res.json({msg : "Snippet delete : ",snipet})
})



  export default router