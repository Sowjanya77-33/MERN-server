// routes/home.js------------>file
const express = require('express')
const router = express.Router();

router.get('/home',(req,res,next)=>{
    res.send(`<h1>Home PageAPI</h1>`)
})
module.exports=router;