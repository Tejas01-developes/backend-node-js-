// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();


// export const cookiefilter=(req,resp,next)=>{
//     const cookie=req.cookies.refresh;

//     if(!cookie){
//         return resp.status(400).json({success:false,message:"no access token"})
//     }

//     jwt.verify(cookie,process.env.REFRESH_KEY,(err,decode)=>{
//         if(err){
//             return resp.status(400).json({success:false,message:"cookie is invalid"})
//         }
//         req.user=decode;
//         console.log(req.user)
//         next();
//     })
// }

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const cookiefilter=(req,resp,next)=>{
    const refreshtoken=req.cookies.refresh;

    if(!refreshtoken){
        return resp.status(400).json({success:false,message:"token is not avalible"})
    }
    jwt.verify(refreshtoken,process.env.REFRESH_KEY,(err,decode)=>{
        if(err){
            return resp.status(400).json({success:false,message:"token is invalid"})
        }
  
     

        req.user=decode 
       
        next();
    })

   
}






