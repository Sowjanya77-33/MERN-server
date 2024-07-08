//routes->users.js
const express = require('express')
const router = express.Router()
const User = require('../model/userSchema')
//import the schema in routes

//POST
router.post('/',(req,res)=>{
    try{
    const {_id,name,email,password} = req.body;
    const userQuery= new User(
        {_id,name,email,password});
        //after our query is created
        //we can save it to the database
        userQuery.save();
        res.status(201).send(
            {message:"User Created"}
        );
    }catch(err){
        res.status(500).send(
            {message:err.message}
        );
    }
   
})
router.get('/',async(req,res)=>{
    try{
        const data=await User.find();
        res.status(201).send(data);
    }catch(err){
        res.status(500).send({message:err});
    }
   
})
//PUT the data (update the data)
router.put('/:id', async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.params.id;
         const updatedUser = await
          User.updateOne({_id:userId}, {$set:{password:password }});
          //use findByIdAndUpdate instead of UpdateOne
        if (updatedUser.nModified==0) {
            return res.status(404).send({ message: "User not found" }); }
        res.status(200).send({ message: "Password updated successfully", updatedUser });
    } catch (err) {
        res.status(500).send(err);
} });
router.delete('/:id',async(req,res)=>{
    try{
        const userId=req.params.id;
        const deleteUser=await User.findByIdAndDelete(userId);
        if(!deleteUser){
            return res.status(404).send({message:"Id doesnot exit"})
        }
        res.status(200).send({message:"user deleted",deleteUser});
    }catch(err){
        res.status(500).send({message:err})
    }
})
module.exports=router;
