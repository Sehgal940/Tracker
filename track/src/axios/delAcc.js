import axios from 'axios'
import Cookies from 'js-cookie'

export const delAcc=async(userid)=>{
    const token=Cookies.get('token')
    try{
       await axios.delete(`${process.env.REACT_APP_URL}/deleteaccount/${userid}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }})
    }
    catch(error)
    {
        console.log('error in delAcc')
    }
}