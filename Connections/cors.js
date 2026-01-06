import cors from 'cors';


export const frontend=cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
})