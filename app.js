import express, { json } from 'express';
import http from 'http';
import './Connections/mysql.js';
import "./Connections/passport.js"
import { frontend } from './Connections/cors.js';
import router from './routes/routes.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import passport from 'passport';
import router2 from './routes/route2.js';
dotenv.config();

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(json());
app.use(cookieParser())
app.use(passport.initialize());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})
const onlineuser=new Map();
console.log(onlineuser)
io.on("connection",(socket)=>{
console.log("socket connected",socket.id)

socket.on("join",(email)=>{
    onlineuser.set(email,socket.id)
    console.log("joined",email)
})

socket.on("sendmessage",({sender,reciver,type,msg,filename})=>{
    const reciversocket=onlineuser.get(reciver)

    if(reciversocket){
        io.to(reciversocket).emit("recivermessage",{
            sender,
            msg
        })
    }


})

socket.on("disconnect",()=>{
    for(const[email,id] of onlineuser.entries()){
        if(id === socket.id){
            onlineuser.delete(email);
            break
        }
    }
})

})









app.use(frontend)
app.use("/apis",router)
app.use("/auth",router2)

const port=process.env.PORT || 3000;





server.listen(port,()=>{
    console.log("server started on port 3000")
})
