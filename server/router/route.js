const express=require('express')
const router=express.Router()
const trx=require('../DB/models/trx')
const user=require('../DB/models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const passport=require('passport')
const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,`../track/public`)
    }
    ,
    filename:(req,file,cb)=>{
        const Data=new Date()
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage})

router.post('/transaction', async (req, res) => {
    const { data, userid } = req.body;
    const { amount, description, date } = data;

        const Transaction= await trx.create({
            amount: amount,
            description: description,
            date: date,
            user_id: userid
        });
        res.end();
});

router.get('/transaction',passport.authenticate('jwt',{session:false}),async(req,res)=>{
const {id}=req.headers
let resArray=await trx.find({user_id:id}).sort({createdAt:-1})
res.status(200).send(resArray)
})

router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const {id}=req.params
    await trx.deleteOne({_id:id})
res.end()
})

router.put('/update',async(req,res)=>{
    const {id}=req.headers
    await trx.updateOne({_id:id},{$set:req.body})
    res.end()
})

router.post('/register',async(req,res)=>{
    const {email}=req.body
    const exists=await user.findOne({email:email})
    if(exists)
    {
        res.send('user already exists')
    }
    else
    {
        const {firstname,lastname,email,password}=req.body
        const hashedPass=await bcrypt.hash(password,10);
        await user.create({firstname,lastname,email,password:hashedPass})
        await user.save
        res.send('user created')
    }
})

router.post('/login',async(req,res)=>{
    const {password,email}=req.body
    const exists=await user.findOne({email:email})
    if(exists)
    {
        const passValid=await bcrypt.compare(password,exists.password)
        if(passValid)
        {
            const id=exists._id
            const payload={
                _id:id,
                email:exists.password
            }
            const token=jwt.sign(payload,'secretkey',{expiresIn:'50m'})
            res.send({token,id})
        }
        else
        {
             res.send('incorrect credentials')
        }
    }
    else
    {
        res.send(`user don't exists`)
    }
})

router.delete('/deleteaccount/:userid',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const {userid}=req.params
    await trx.deleteMany({user_id:userid})
    await user.deleteOne({_id:userid})
res.end()
})

router.post('/verify',async(req,res)=>{
    const {email}=req.body
    const exists=await user.findOne({email:email})
    if(exists)
    {
        const payload={
            _id:exists._id,
            email:exists.email
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'10m'})
        const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.AUTHMAILID,
            pass:process.env.AUTHPASS
        }   
        })
        const mail={
            from:process.env.AUTHMAILID,
            to:exists.email,
            subject:'password change',
            text:`${process.env.URL}/reset/${token}/${exists._id}`,
        }
        transport.sendMail(mail,(err)=>{
            if(err)console.log(err)
            else console.log('mail sent')
        })
        res.send('email sent')
    }
    else
    {
        res.send('not valid')
    }
})

router.get('/reset/:token/:id',async(req,res)=>{
    const token=req.params.token
    const id=req.params.id
    try{
        const exists=await user.findOne({_id:id})
        if(exists)
        {
            jwt.verify(token,process.env.JWT_SECRET)
            res.render('reset',{title:'resetpassword'})
        }
    }
    catch(error)
    {
        res.status(404)
        res.end()
    } 
})

router.post('/reset/:token/:id',async(req,res)=>{
    const token=req.params.token
    const id=req.params.id
    try{
        const exists=await user.findOne({_id:id})
        if(exists)
        {
            jwt.verify(token,process.env.JWT_SECRET)
            const hashedPass=await bcrypt.hash(req.body.password,10)
            exists.password=hashedPass
            exists.save()
            res.send('<h1>password Changed</h1>')
        }
    }
    catch(error)
    {
        res.status(404)
        res.end()
    } 
})

router.put('/media',passport.authenticate('jwt',{session:false}),upload.single('fileimg'),async(req,res)=>{
    const fileName=req.file.filename
    const {id}=req.headers
    await user.updateOne({_id:id},{$set:{imgurl:fileName}})
    await user.save
    res.send('/')
})

router.get('/UserImg',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const{id}=req.headers
    const url= await user.findOne({_id:id})
    const img=url?.imgurl
    res.send(img)
})

module.exports=router
