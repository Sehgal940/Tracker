import axios from 'axios'
import Cookies from 'js-cookie'

export const uploadMedia=async(fd)=>{
    const token=Cookies.get('token')
    const userid=Cookies.get('userid')
    try{
        await axios.put(`${process.env.REACT_APP_URL}/media`,fd,{
        headers:{
            Authorization:`Bearer ${token}`,
            id:userid
        }})
    }
    catch(error)
    {
        console.log('error in uploadMedia')
    }
}