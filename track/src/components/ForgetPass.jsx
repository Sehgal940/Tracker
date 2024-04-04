import React,{useContext, useState} from 'react'
import styled from 'styled-components'
import { Box,TextField,Button, Typography } from '@mui/material'
import{verUser} from '../axios/verUser'
import { useNavigate} from 'react-router-dom'
import { appData } from '../context/Context'
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

function ForgetPass() {

const[verDetails,setVerDetails]=useState({
    email:'',
   })

const navigate=useNavigate()

const[gotEmail,setGotEmail]=useState('Verification')

const {token}=useContext(appData)

const addDetails=(e)=>{
    setVerDetails({...verDetails,[e.target.name]:e.target.value})
}

const handleVerDetails=async()=>{
    for(let key in verDetails)
    {
        if(verDetails[key].trim()==='')
        {
            alert('Fill the details')
            return 
        }
        if(!(verDetails["email"].includes('@') && verDetails["email"].includes('.com')))
        {
            alert('Fill valid mail address')
            return 
        }
    }
    const data=await verUser(verDetails)
    if(data==='email sent')
    {
        setGotEmail('Email Sent')
    }
    else
    {
        setGotEmail('Invalid Email Address')
    }
    setVerDetails({
        email:''
    })
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
      <Typography style={{textAlign:'center',fontSize:'2rem',color:'grey'}}>{gotEmail}</Typography>
      {
        gotEmail==='Email Sent'?'':<TextField label='Email' onChange={(e)=>addDetails(e)} value={verDetails.email} name='email'/>
      }
      </Box>
      <Box style={{width:'50%'}}>
      {
        gotEmail==='Email Sent'?<Button style={{width:'100%'}} onClick={()=>navigate('/login')}  variant='contained'>Back</Button>:<Button style={{width:'100%'}} onClick={handleVerDetails}  variant='contained'>Verify</Button>
      }
      </Box>
      </BOX>
  </Box>
  </form>
    }
    </>   
  )
}

export default ForgetPass