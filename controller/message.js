import {db} from '../Connections/mysql.js';
import { getfileurl } from '../filter/geturl.js';

// const getfiletype=(mimetype)=>{
//     if(mimetype.startsWith("image/")) return "image";
//     if(mimetype === "application/pdf") return "pdf";
//     if(mimetype === "application/msword" || mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "doc";
//     if(mimetype.startsWith("video/")) return "video";
//      return "other";


// }




export const sendmsg=(req,resp)=>{
    const activeuser=req.user.email;

    if(!activeuser){
        return resp.status(400).json({success:false,message:"you are not logged in"})
    }
const{reciver,message}=req.body;
const file=req.file;
if(!reciver || (!message && !file)){
    return resp.status(400).json({success:false,message:"reviver or message is not set"})
}
if(message){
db.query(
    'INSERT INTO messages (sender,reciver,msg,type) VALUES (?,?,?,?)',
    [activeuser,reciver,message,"text"],
    (err)=>{
        if(err){
            return resp.status(400).json({success:false,message:"message not sent"})
        }
        return resp.status(200).json({success:true,message:"message sent"})
    }
)
}else if(file){
    // const filetype=getfiletype(file.mimetype);
db.query(
    'INSERT INTO messages (sender,reciver,msg,type) VALUES (?,?,?,?)',[activeuser,reciver,file.location,"file"],
    async(err)=>{
        if(err){
            return resp.status(400).json({success:false,message:"file not uploaded on s3"})
        }
        const signurl=await getfileurl(filekey)
        return resp.status(200).json({success:true,message:"file  uploaded on s3",msg:signurl})
    }
)

}

}


export const getmessages=(req,resp)=>{
    const activeuser=req.user.email;

    if(!activeuser){
        return resp.status(400).json({success:false,message:"you are not logged in"})
    }
    const{friend}=req.query;
  
    if(!friend){
        return resp.status(400).json({success:false,message:"you are not logged in"})
    }

    db.query(
        `SELECT sender,reciver,msg,type,msg_at FROM messages WHERE 
        (sender=? AND reciver=? ) OR
        (reciver=? AND sender=? ) ORDER BY msg_at ASC`,
        // [activeuser,friend,friend,activeuser],
        [activeuser,friend,activeuser,friend],
        (err,result)=>{
            if(err){
                return resp.status(400).json({success:false,message:"message not sent"}) 
            }
            if(result.length === 0){
                return resp.status(400).json({success:false,message:"No messages"}) 
            }
            return resp.status(200).json({success:true,message:"messages",messages:result})
        }
    )
}




