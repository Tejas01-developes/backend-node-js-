import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../Connections/s3.js';

export const upload=multer({
    storage:multerS3({
        s3:s3,
        bucket:process.env.BUCKET_NAME,
    
        metadata:(req,file,cb)=>{
            cb(null,{fieldname:file.fieldname})
        },
        key:(req,file,cb)=>{
            const filename=`chat/${Date.now()}-${file.originalname}`;
            cb(null,filename);
        }
    })

})