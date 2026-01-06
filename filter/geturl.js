import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from '../Connections/s3.js';

export const getfileurl=async(key)=>{
    const command=new GetObjectCommand({
        Bucket:process.env.BUCKET_NAME,
        key:key,
    });

    const url=await getSignedUrl(s3,command,{
        expiresIn:60* 5,
    })
}