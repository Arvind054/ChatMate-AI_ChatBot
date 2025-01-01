import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {UserData, Chat,Conversation} from './Models/schema.js'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
dbConnection()
.then(console.log("db connected successfully"))
.catch((e)=> console.log("Error Occured ", e));
async function dbConnection(){
    await mongoose.connect(process.env.MONGODB_URL);
}

app.get('/login',  async(req, res)=>{
      const {email, password} = req.query;
      const user = await UserData.findOne({email:email});
      if(user.password != '' || user.password != undefined){
        bcrypt.compare(password, user.password, (err, result)=>{
          if(err){
                  res.status(401).send("Invalid Password");
                 }else{
                  if(result){
                  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' });
                  res.send({token: token});
                  }else{
                    res.status(401).send("Invalid Password");
                  }
                 }
         });
      }else{
        res.status(404).send("User Not Found");
      }
});
app.post('/signUp', async(req, res)=>{
  //console.log(req.body);
  try{
    const {name,email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserData({ name:name, email:email, password: hashedPassword , username: name});
    await newUser.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' });
     res.send(
      {token: token}
     );
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
      
});
app.get('/verify', async(req, res)=>{
 
  const {token} = req.query;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded)=>{
    if(err){
      res.status(401).send("Invalid Token");
    }else{
      const Data = await UserData.findOne({email:decoded.email});
      res.status(200).json({data : Data});
    }
  });
});
app.get('/getUser', async(req, res)=>{
  const {email} = req.query;
  console.log(email);
  res.status(200).send("User Found");
});
app.listen(process.env.PORT,(req, res)=>{
     console.log('app is running on port' , process.env.PORT);
})