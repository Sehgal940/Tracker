import axios from 'axios'

export const uploadTrx=async(data,userid)=>{
    try{
        await axios.post(`${process.env.REACT_APP_URL}/transaction`,{data,userid})
    }
    catch(error)
    {
        console.log('error in uploadTrx')
    }
}