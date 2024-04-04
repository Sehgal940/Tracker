import React,{useContext, useState} from 'react'
import styled from 'styled-components'
import { Box,TextField,Button, Typography } from '@mui/material'
import{logUser} from '../axios/logUser'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import {appData} from '../context/Context'
import Main from './Main'

const BOX=styled(Box)`
height:100%;
width:100%;
display:flex;
align-items:center;
flex-direction:column;
gap:10px;

@media (min-width:960px){
    width:50%;
}
`

function Login() {
  
const[logDetails,setLogDetails]=useState({
    email:'',
    password:''
})

const addDetails=(e)=>{
    setLogDetails({...logDetails,[e.target.name]:e.target.value})
}

const navigate=useNavigate()

const {token}=useContext(appData)

const handleLogDetails=async()=>{
    for(let key in logDetails)
    {
        if(logDetails[key].trim()==='')
        {
            alert('fill the details')
            return 
        }
        if(!(logDetails["email"].includes('@') && logDetails["email"].includes('.com')))
        {
            alert('Fill valid mail address')
            return 
        }
        else
        {
          logDetails.email=logDetails.email.toLowerCase()
        }
    }
    const data=await logUser(logDetails)
    if(data!==`user don't exists` && data!=='incorrect credentials')
    {
      Cookies.set('token',data.token)
      Cookies.set('userid',data.id)
      navigate('/main')
      setLogDetails({
        email:'',
        password:''
      })
    } 
    else
    {
      alert(data)
      setLogDetails({
        email:'',
        password:''
    })
    }   
}

  return (
    <>
    {
      token ?
      <>
      <Main/>
      </>
      :
      <form onSubmit={(e)=>e.preventDefault()}>
      <Box style={{minHeight:'90vh',width:'100vw',display:'flex',alignItems:'start',justifyContent:'center',backgroundColor:'white'}}>
      <BOX>
        <Box style={{marginTop:'120px',width:'50%',display:'flex',flexDirection:'column',gap:10}}>
        <Typography style={{textAlign:'center',fontSize:'2rem',color:'grey'}}>Log In</Typography>
        <TextField label='Email' onChange={(e)=>addDetails(e)} value={logDetails.email} name='email'/>
          <TextField label='Password' type='password' onChange={(e)=>addDetails(e)} value={logDetails.password} name='password'/>
        </Box>
  
        <Box style={{width:'50%'}}>
        <Button style={{width:'100%'}} onClick={handleLogDetails}  variant='contained'>Login</Button>
        </Box>
        <NavLink style={{color:'grey',textDecoration:'none'}} to={'/forgetpass'}>Forget password ?</NavLink>
        </BOX>
    </Box>
    </form>    


    }
    </>

  )
}

export default Login