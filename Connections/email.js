import nodemailer from 'nodemailer';

const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_NAME,
        pass:process.env.EMAIL_PASS
    }
})




export const sendmails=async(to,subject,text)=>{
transport.sendMail({
    from:process.env.EMAIL_NAME,
    to,
    subject,
    text
})



}

