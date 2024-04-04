import axios from 'axios'
import Cookies from 'js-cookie'

export const loadUserImg=async(userid)=>{
    const token=Cookies.get('token')
    try{
       const {data}=await axios.get(`${process.env.REACT_APP_URL}/UserImg`,{
        headers:{
            Authorization:`Bearer ${token}`,
            id:userid
        }
       })
       if(data)return data
    }
    catch(error)
    {
        console.log('error in loadUserImg')
    }
}