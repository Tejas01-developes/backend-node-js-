import express from 'express';
import { loginuser, register } from '../controller/Reg_login.js';
import { limit } from '../Connections/ratelimit.js';
import { addfriend, getfriends } from '../controller/addfriends.js';
import { cookiefilter } from '../filter/cookiefilter.js';
import { getmessages, sendmsg } from '../controller/message.js';
import { upload } from '../filter/upload.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",limit,loginuser)
router.post("/add",cookiefilter,addfriend)
router.get("/get",cookiefilter,getfriends);
router.post("/send",cookiefilter,upload.single("file"),sendmsg);
router.get("/getmsg",cookiefilter,getmessages);
export default router;