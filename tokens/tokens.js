import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const accesstoken=(user)=>{
    return jwt.sign(
        {email:user.email},
        process.env.ACCESS_KEY,
        {expiresIn:'15m'}
    )
}



export const refreshtoken=(user)=>{
   return jwt.sign(
        {email:user.email},
        process.env.REFRESH_KEY,
        {expiresIn:'7d'}
    )
}