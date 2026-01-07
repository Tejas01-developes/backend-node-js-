
import express from 'express';
import { accesstoken, refreshtoken } from '../tokens/tokens.js';
import passport from 'passport';
const router2=express.Router();




router2.get("/google",passport.authenticate("google",{
    scope:["profile","email"]
}))


router2.get("/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"/"
}),
(req,resp)=>{
const access=accesstoken({email:req.user.email})
const refresh=refreshtoken({email:req.user.email})

resp.cookie("refresh",refresh,{
    httpOnly:true,
    sameSite:"Lax",
    secure:true,
    path:"/"
})

resp.redirect(`http://localhost:5173/home?token=${access}`);
}

)


export default router2;
