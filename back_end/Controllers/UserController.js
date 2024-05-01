const User = require('../models/UserModel');
const Counter = require('../models/CounterModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const login= async(req, res)=>{
  const{email, password}= req.body;
  try{
      const user= await User.findOne({email: email})
      if(user)
      {
        bcrypt.compare(password, user.password)
        .then(isCorrect=>{
            if(!isCorrect) 
              res.json({message: "Password is Wrong"});

            const token = jwt.sign({
                userId: user.userId,
            }, process.env.JWT_SECRET,{expiresIn: "24h"});

            res.json({message : "Exist" ,token: token });
        })
        .catch(()=>{
            res.json({message : "password is wrong"});
        })
      }
      else
        res.json({message: "Email does not Exist" });
  }
  catch(e){
    res.json({message : "Network Error" });
  }
}


const register = async(req, res)=> {
  const {name, email, password}= req.body;
  if (!validator.isEmail(email)) {
    res.json({message: 'Enter valid email'});
  }
  if(password.length<8)
  {
    res.json({message: 'Password should be strong length >8'});
  }
  try{
    let check = await User.findOne({email: email})
    if(check)
    {
      res.json({message: "Email is already Exist"});
    }
    else
    {
      let gotId;
      const userCounter = await Counter.findOneAndUpdate(
        { id: 'userId' },
        { $inc: { count: 1 } },
        { new: true }
      ).exec();
      if (userCounter == null) {
          const newCounter = new Counter({ id: 'userId', count: 1 });
          await newCounter.save();
          gotId = 1;
      }
      else {
          gotId = userCounter.count;
      }
      bcrypt.hash(password, 10)
      .then((hp) =>{
        const newUser =new User({
            userId : gotId,
            name : name,
            email : email,
            password: hp
        })
        newUser.save().then(()=>{
            const token = jwt.sign({
                userId: newUser.userId,
            }, process.env.JWT_SECRET,{expiresIn: "24h"});

            res.json({message: "signedIn", token: token});
        }).catch((e)=>{
            res.json({message: 'error', error: e});
        })
      })
      .catch((e)=>{
        res.json({message: 'error', error: e});
      })
    }
  }
  catch(e){
    res.json({message: 'erroe', error: e});
  }
}


const getUser = async(req, res)=> {
  const userId = req.userId;
  try{
    const user = await User.findOne({userId: userId});
    res.json({message : "got", user: user});
  }
  catch(err)
  {
    res.json({message: "err", error: err});
  }

}


module.exports= {login, register, getUser};