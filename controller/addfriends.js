
import {db} from '../Connections/mysql.js'



export const addfriend=(req,resp)=>{
    const{email}=req.body;
    if(!email){
        return resp.status(400).json({success:false,message:"email is not there"})
    }
const activeuser=req.user.email;

if(!activeuser){
    return resp.status(400).json({success:false,message:"you are not logged in"})
}

db.query(
    'SELECT email FROM users WHERE email=?',
    [email],
    (err,result)=>{
        if(err){
            return resp.status(400).json({success:false,message:"db error"})
        }
        if(result.length === 0){
            return resp.status(400).json({success:false,message:"no registered email"})
        }
        const friendid=Math.floor(10000 + Math.random() * 90000)
        db.query(
            'SELECT active_user FROM friends WHERE friends_email=?',
            [email],
            (err,result)=>{
                if(err){
                    return resp.status(400).json({success:false,message:"database error"})
                }
                if(result.length > 0){
                    if(activeuser === result[0].active_user){
                        return resp.status(400).json({success:false,message:"user added already"})
                    }
                }
        db.query(
            'INSERT INTO friends (friendid,active_user,friends_email) VALUES (?,?,?)',
            [friendid,activeuser,email],
           
            (err)=>{
                if(err){
                    return resp.status(400).json({success:false,message:"friend not added"})
                }
              
                return resp.status(200).json({success:true,message:"user added"})
            }
        )
                
}

)
    }
)
}



export const getfriends=(req,resp)=>{
    const activeuser=req.user.email;

if(!activeuser){
    return resp.status(400).json({success:false,message:"you are not logged in"})
}

db.query(
    'SELECT friends_email FROM friends  WHERE active_user=?',
    [activeuser],
    (err,result)=>{
        if(err){
            return resp.status(400).json({success:false,message:"db error"})
        }
        const friends=result
        return resp.status(200).json({success:true,message:"list of friends",friends:friends})
    }
)

}
