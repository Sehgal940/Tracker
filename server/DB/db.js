const mongoose=require('mongoose')
function connect(){
    const uri=process.env.URI
    try{
        mongoose.connect(uri)
        console.log('mongoose connection success')
    }
    catch(error)
    {
        console.log('mongoose connection fail')
    }
}
module.exports=connect
