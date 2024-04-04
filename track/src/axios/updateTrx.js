import axios from 'axios'

export const updateTrx=async(data)=>{
    try{
        await axios.put(`${process.env.REACT_APP_URL}/update`,data,{
            headers:{
                id:data._id
            }
        })
    }
    catch(error)
    {
        console.log('error in updateTrx')
    }
}