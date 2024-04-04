import axios from 'axios'

export const regUser=async(regDetails)=>{
  
    try{
       const {data}=await axios.post(`${process.env.REACT_APP_URL}/register`,regDetails)
       return data
    }
    catch(error)
    {
        console.log('error in regUser')
    }
}