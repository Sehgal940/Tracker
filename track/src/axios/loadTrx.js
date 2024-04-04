import axios from 'axios'
import Cookies from 'js-cookie'

export const loadTrx=async(userid)=>{
    const token=Cookies.get('token')
    try{
       const {data}=await axios.get(`${process.env.REACT_APP_URL}/transaction`,{
        headers:{
            Authorization:`Bearer ${token}`,
            id:userid
        }
       })
       return data
    }
    catch(error)
    {
        console.log('error in loadTrx')
    }
}