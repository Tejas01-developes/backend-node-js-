import ratelimit from 'express-rate-limit';
import { ipKeyGenerator } from 'express-rate-limit';

export const limit=ratelimit({
    windowMs:15 * 60 * 1000,
    max:5,
    keyGenerator:(req)=>{
return ipKeyGenerator(req)
    },
    message:{
        success:false,
        message:"too many attempts"
    },
    standardHeaders:true,
    legacyHeaders:false
})