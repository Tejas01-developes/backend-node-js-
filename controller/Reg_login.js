import {db} from '../Connections/mysql.js';
import bcrypt from 'bcrypt';
import {accesstoken, refreshtoken} from '../tokens/tokens.js'
import { sendmails } from '../Connections/email.js';


export const register=async(req,resp)=>{
const{name,email,password}=req.body;

if(!name || !email || !password){
    return resp.status(400).json({success:false,message:"fill each field"})
}try{
// db.query(
//     'SELECT email FROM users WHERE email=?',
//     [email],
//    async (err,result)=>{
// if(err){
//     return resp.status(400).json({success:false,message:"database error"})
// }
// if(result.length > 0 ){
//     return resp.status(400).json({success:false,message:"email is already present"})
// }
const hash=await bcrypt.hash(password,10);

db.query(
    'INSERT INTO users (full_name,email,password) VALUES (?,?,?)',
    [name,email,hash],
    (err)=>{
        if(err){
            return resp.status(400).json({success:false,message:"insertation failed"})
        }
        setImmediate(()=>{
            sendmails(
                email,
                "welcome to out service",
                "your registered email is " + email
            )
        })
       
        return resp.status(200).json({success:true,message:"inserted user"})
    
    }

)

    // }
// )
}catch(err){
    console.log("error",err);
}
}





export const loginuser=async(req,resp)=>{
    const{email,password}=req.body;
    
    if(!email || !password){
        return resp.status(400).json({success:false,message:"fill each field"})
    }

    db.query(
        'SELECT email,password FROM users WHERE email=?',
        [email],
      async  (err,result)=>{
            if(err){
                return resp.status(400).json({success:false,message:"db error"})
            }
            if(result.length === 0){
                return resp.status(400).json({success:false,message:"no email found"})
            }
         
            const verify=await bcrypt.compare(password,result[0].password);
            if(!verify){
                return resp.status(400).json({success:false,message:"password is incorrect"})
            }
           
            const access=accesstoken({email});
            const refresh=refreshtoken({email});
    

db.query(
    'SELECT refresh FROM REFRESHTOKEN WHERE tokenuser=?',
    [email],
    (err,result)=>{
        if(err){
            return resp.status(400).json({success:false,message:true})
        }
        if(result.length === 0){
            db.query(
                'INSERT INTO refreshtoken (tokenuser,refresh) VALUES (?,?)',
                [email,refresh],
                (err)=>{
                    if(err){
                        return resp.status(400).json({success:false,message:"token not added"})
                    }
                    // return resp.status(200).json({success:true,message:"token set"})
                }
            )
        }else
       {
            db.query(
                'UPDATE refreshtoken SET refresh=? WHERE tokenuser=?',
                [refresh,email],
                (err)=>{
                    if(err){
                        return resp.status(400).json({success:false,message:"update failed"})
                    }
                    // return resp.status(200).json({success:true,message:"token updated"})
                }
            )
        }
    }
)

           
          
            resp.cookie("refresh",refresh,{
                httpOnly:true,
                secure:true,
                path:"/",
                sameSite:"Lax"
            })
           

            return resp.status(200).json({success:true,message:"login success",access:access})


        }
    )


}