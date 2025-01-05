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
      res.status(200).send("user verified successfully");
    }
  });
});
//for getting all the chats of the user for sidebar 
app.get('/chats/all', async(req, res)=>{
  const token = req.headers.token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded)=>{
    if(err){
      res.status(401).send("Invalid Token");
    }else{
      const data = await UserData.findOne({email:decoded.email}).populate('chats');
      res.send({data : data});
    }
  });
});
//for Getting all meaasges of a chat.
app.get('/chats/all/:id', async(req, res)=>{
    const chatId = req.params.id;
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded)=>{
      if(err){
        res.status(401).send("Error Occured");
      }else{
        const chats = await Chat.findOne({_id: chatId}).populate('chat');
        res.send({data:chats});
      }
    });
})

//for Creating a new chat:
app.post('/chats/new', async(req, res)=>{
  const token = req.headers.token;
    const newChat = new Chat({chat :[], tittle: "new Chat user" });
    await newChat.save();
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded)=>{
      if(err){
        res.status(401).send("Error Occured");
      }else{
        const email = decoded.email;
        const user = await UserData.findOne({email:email}).populate('chats');
        user.chats.push(newChat);
        await user.save();
        res.send({data : user.chats});
      }
    });
});
// For Creating a new message in the current chat.
app.get('/chats/new/:id', async(req, res)=>{
    const chatId = req.params.id;
    const {question, answer} = req.query;
    const token = req.headers.token;
    const newConversation = new Conversation({question:question, answer: answer});
    await newConversation.save();
    const currChat = await Chat.findOne({_id: chatId});
    currChat.chat.push(newConversation);
    currChat.tittle = question;
    await currChat.save();
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded)=>{
      if(err){
        res.status(401).send("Invalid Token");
      }else{
        const data = await UserData.findOne({email:decoded.email}).populate('chats');
        res.send({data : data});
      }
    });
    
})
app.listen(process.env.PORT,(req, res)=>{
     console.log('app is running on port' , process.env.PORT);
})