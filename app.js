import * as dotenv from 'dotenv';
dotenv.config();
import express  from "express";
import cors from 'cors';

import cloudinary from "cloudinary";


import register from "./route/register.js";
import login from "./route/login.js"
import modifypassword from './route/modify.js'
import snippetFactory from './route/snippetFactory.js'
import cattegory from './route/category.js'
import tags from './route/tags.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
const port = 3500
// toute les routes
  app.use('/', register)
  app.use('/', login)
  app.use('/',modifypassword)
  app.use('/',snippetFactory)
  app.use('/', cattegory)
  app.use('/', tags)
// run the server 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
