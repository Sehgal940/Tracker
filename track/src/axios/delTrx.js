import axios from 'axios'
import Cookies from 'js-cookie'

export const delTrx=async(id)=>{
    const token=Cookies.get('token')
    try{
        await axios.delete(`${process.env.REACT_APP_URL}/delete/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
       })
    }
    catch(error)
    {
        console.log('error in delTrx')
    }
}