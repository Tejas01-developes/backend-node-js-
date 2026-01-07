import express from 'express';
import { loginuser, register } from '../controller/Reg_login.js';
import { limit } from '../Connections/ratelimit.js';
import { addfriend, getfriends } from '../controller/addfriends.js';
import { cookiefilter } from '../filter/cookiefilter.js';
import { getmessages, sendmsg } from '../controller/message.js';
import { upload } from '../filter/upload.js';
import passport from 'passport';
import { accesstoken, refreshtoken } from '../tokens/tokens.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",limit,loginuser)
router.post("/add",cookiefilter,addfriend)
router.get("/get",cookiefilter,getfriends);
router.post("/send",cookiefilter,upload.single("file"),sendmsg);
router.get("/getmsg",cookiefilter,getmessages);

router.get("/google",passport.authenticate("google",{
    scope:["profile","email"]
}))


router.get("/google/callback",passport.authenticate("google",{
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





export default router;