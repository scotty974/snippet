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

  
router.post('/login', async (req,res,next)=>{
    let logindata;
    try{
        logindata = registerValidation.parse(req.body)

    }catch(error){
        return res.status(400).json({errors : error.issues})
    }
    

const user = await prisma.users.findFirst({
    where:{
        email:logindata.email
    },
})

if(!user) return next(createError(403,"Mauvais Email/mot de passe"))

const passwordIsGood = await bcrypt.compare(logindata.password, user.password)

if(!passwordIsGood) return next(createError(403, "Mauvais email/mot de passe"))

// puis on renvoie le token
res.json({
    token: jwt.sign(
      // payload
      {
        id : user.id,
        email: user.email,
        picture:user.picture
      },
      // clef pour signer le token
      process.env["JWT_KEY"],
      // durée du token
      {
        expiresIn: "1h",
      }
    ),
  });

});




  export default router;