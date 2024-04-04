import axios from 'axios'

export const verUser=async(verDetails)=>{
    try{
       const {data}=await axios.get(`${process.env.REACT_APP_URL}/verify`,verDetails)
       return data
    }
    catch(error)
    {
        console.log('error in verUser')
    }
}