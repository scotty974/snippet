import express from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import createError from 'http-errors';
import registerValidation from "../settingZod.js";


const router = express.Router()
const prisma = new PrismaClient();

const auth = expressjwt({
    secret: process.env["JWT_KEY"],
    algorithms: ["HS256"],
  }); 
// la route poir modifier le mot de passe 
router.patch('/modify', async (req,res, next)=>{
    let modifyData
    try{
        modifyData = registerValidation.parse(req.body)
    }catch(error){
        return res.status(400).json({ errors: error.issues })
    }
    const password = await prisma.users.findFirst({
        where:{
            email : modifyData.email
        }
    })
    // on va verifier si le mail de la personne est bon , sinon il peut pas modifier son mot de passe 
    if(!password) return next(createError(200, "Vérifiez votre mail "));
    
    // on va de nouveau hasher le mot de passe 
    const passwordReset = await bcrypt.hash(modifyData.password, 10) 

    await prisma.users.update({
     where:{
        email:modifyData.email
     },
     data:{
        password:passwordReset
     } 
    }).then(()=>{
        res.json({"message" : "Mot de passe modifié"})
    })
})





  export default router;