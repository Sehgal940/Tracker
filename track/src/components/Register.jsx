import { Box,TextField,Button, Typography } from '@mui/material'
import React, { useState,useContext } from 'react'
import styled from 'styled-components'
import {regUser} from '../axios/regUser'
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

function Register() {

    const[regDetails,setRegDetails]=useState({
        firstname:'',
        lastname:'',
        email:'',
        password:''
    })

    const navigate=useNavigate()
    
    const {token}=useContext(appData)

    const addDetails=(e)=>{
        setRegDetails({...regDetails,[e.target.name]:e.target.value})
    }

    const handleRegDetails=async()=>{
        for(let key in regDetails)
        {
            if(regDetails[key].trim()==='')
            {
                alert('fill the details')
                return 
            }
            if(!(regDetails["email"].includes('@') && regDetails["email"].includes('.com')))
            {
                alert('Fill valid mail address')
                return 
            }
            else
            {
                regDetails.email=regDetails.email.toLowerCase()
            }
        }
        const data=await regUser(regDetails)
        if(data==='user already exists')
        {
            alert(data)
            setRegDetails({
                firstname:'',
                lastname:'',
                email:'',
                password:''
            })
        }
        else
        {
            setRegDetails({
                firstname:'',
                lastname:'',
                email:'',
                password:''
            })
            navigate('/login')
        }
    }

  return (
    <>
    {
      token ?
      <Main/>
      :
      <form onSubmit={(e)=>e.preventDefault()}>
      <Box style={{minHeight:'90vh',width:'100vw',display:'flex',alignItems:'start',justifyContent:'center',backgroundColor:'white'}}>
        <BOX>
          <Box style={{marginTop:'120px',width:'50%',display:'flex',flexDirection:'column',gap:10}}>
          <Typography style={{textAlign:'center',fontSize:'2rem',color:'grey'}}>Sign In</Typography>
  
          <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
          <TextField style={{width:'48%'}} label='First Name' onChange={(e)=>addDetails(e)} value={regDetails.firstname} name='firstname'/>
          <TextField style={{width:'48%'}}  label='Last Name' onChange={(e)=>addDetails(e)} value={regDetails.lastname} name='lastname'/>
          </Box>
          <TextField label='Email' onChange={(e)=>addDetails(e)} value={regDetails.email} name='email'/>
          <TextField label='Password' onChange={(e)=>addDetails(e)} value={regDetails.password} name='password'/>
          </Box>
  
          <Box style={{width:'50%'}}>
          <Button onClick={handleRegDetails} style={{width:'100%'}} variant='contained'>Register</Button>
          </Box>
          </BOX>
      </Box>
      </form>
    }
    </>
  )
}

export default Register