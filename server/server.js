const express=require('express')
const server=express()
const connect=require('./DB/db')
require('dotenv').config()
const PORT=process.env.PORT
const router=require('./router/route')
const cors=require('cors')
const passport=require('passport')
const passjwt=require('passport-jwt')
const user=require('./DB/models/user')
const JwtStrategy = passjwt.Strategy
const ExtractJwt = passjwt.ExtractJwt

server.use(cors({
    origin:['http://localhost:3000']
}))

server.set('view engine','ejs')
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(router)
server.use(passport.initialize())

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
passport.use(new JwtStrategy(opts,function(jwt_payload, done){
    const USER=user.findOne({id: jwt_payload._id})
        if (USER) {
            return done(null, user);
        } else {
            return done(null, false);
        }
}));


connect()
server.listen(PORT||9000,()=>{
    console.log(`serverd on port ${PORT}`)
})