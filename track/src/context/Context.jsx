import React,{createContext, useState} from 'react'
import Cookies from 'js-cookie'

const appData=createContext(null)
function Context({children}) {
  
  const token=Cookies.get('token')
  const userid=Cookies.get('userid')
  const [url,setUrl]=useState('')
  
  return (
    <div>
        <appData.Provider value={{token,userid,url,setUrl}}>
            {children}
        </appData.Provider>
    </div>
  )
}

export default Context
export {appData}