import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {db} from '../Connections/mysql.js'
import dotenv from 'dotenv';
dotenv.config();



 passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_REDIRECT_URI
    },
async(accesstoken,refreshtoken,profile,done)=>{
    try{
        const email=profile.emails[0].value;
        const googleid=profile.id;
        const name=profile.displayName;
      
        db.query(
            'SELECT * FROM users WHERE email=?',
            [email],
            (err,result)=>{
                if(err){
                    return done(err)
                }
                if(result.length > 0){
                    return done(null,result[0])
                }
                db.query(
                    `INSERT INTO users (full_name,email,googleid,provider) VALUES (?,?,?,"google")`,
                    [name,email,googleid],
                    (err,result)=>{
                        if(err){
                            return done(err)
                        }
                        return done(null,{
                            id:result.insertId,
                            email,
                        })
                    }
                )
            }
        )



    }catch(err){
        console.log("error",err)
    }
}

)
)


export default passport;