const User = require("../models/userModel");



//Register

exports.registerUser = async(req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"profileURL"
        }
    });

    res.status(201).json({
        success:true,
        user,
    });

}