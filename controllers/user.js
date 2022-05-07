import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/user.js'

export const signIn=async(req,res)=>{
  const {email,password}=req.body
  try {
      const oldUser=await userModel.findOne({email})
      if(!oldUser) return res.status(400).json({message:'User deos not exits'})
      
      const isPasswordCorrect=await bcrypt.compare(password,oldUser.password)
      if(!isPasswordCorrect) return res.status(400).json({message:'invalid credentials'})

      const token=jwt.sign({email:oldUser.email,id:oldUser._id},'test',{expiresIn:"1h"})
      res.status(200).json({result:oldUser,token})
  } catch (error) {
      res.status(500).json({message:"some thing went wrong"})
      
  }
}

export const signUp=async(req,res)=>{
    const {email,password,firstName,lastName}=req.body
    try {
        const oldUser=await userModel.findOne({email})
        if(oldUser) return res.status(400).json({message:'user already exists'})
        const hashedPassword=await bcrypt.hash(password,12)
        const result=await userModel.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token =jwt.sign({email:result.email,id:result._id},'test',{ expiresIn: "1h" })
        res.status(201).json({result,token})
    } catch (error) {
        res.status(500).json({message:"Somting Went Wrong"})
        
    }
    
    
}