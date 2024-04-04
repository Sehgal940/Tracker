import axios from 'axios'

export const logUser=async(userdata)=>{
    try{
       const {data}=await axios.post(`${process.env.REACT_APP_URL}/login`,userdata)
       return data
    }
    catch(error)
    {
        console.log('error in logUser')
    }
}