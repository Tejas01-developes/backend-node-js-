import { accesstoken, refreshtoken } from "../tokens/tokens.js"

 export const tokenss=(req,resp)=>{
const access=accesstoken({email:req.user.email})
const refresh=refreshtoken({email:req.user.email})

resp.cookie("refresh",refresh,{
    httpOnly:true,
    sameSite:"Lax",
    secure:true,
    path:"/"
})
return resp.status(400).json({success:true,message:"login done",access:access})
// resp.redirect(`http://localhost:5173/home?token=${access}`);
}


