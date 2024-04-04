import React, { useContext,useRef,useEffect, useState} from 'react'
import {Box,AppBar,Toolbar,Typography,Button} from '@mui/material'
import { NavLink} from 'react-router-dom'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { appData } from '../context/Context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {delAcc} from '../axios/delAcc'
import ModeIcon from '@mui/icons-material/Mode';
import{uploadMedia} from '../axios/uploadMedia'
import{loadUserImg} from '../axios/loadUserImg'

function Nav() {

  const {token,userid,url,setUrl}=useContext(appData)
  
  const navigate=useNavigate()

  const media=useRef()

  const[change,setChange]=useState(null)

  const handleM=async()=>{
    const data=await loadUserImg(userid)
    if(data)setUrl(data)
  }
  
    useEffect(()=>{
      if(token)handleM()
    },[change])

  const handleLoginOut=()=>{
    Cookies.remove('token');
    Cookies.remove('userid')
    setUrl('')
    navigate('/login')
  }
  const handleAcc=()=>{
   delAcc(userid)
   Cookies.remove('token')
   Cookies.remove('userid')
   setUrl('')
   navigate('/login')
   alert('account deleted')
  }
  const handleInputMedia=async(e)=>{
    const file=e.target.files[0]
    const fd=new FormData();
    fd.append('fileimg',file)
    await uploadMedia(fd);
    setChange(file)
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
            <AccountBalanceWalletIcon style={{color:'inherit'}}/>
          <Typography variant="h5"  style={{ flexGrow: 1,marginLeft:'5px' }}>
            Expense Track
          </Typography>
            {  token ?
              <>
              {
              url.length>0?
              <>
              <span style={{height:'50px',width:'80px',background:'white',borderRadius:'10px',marginRight:'20px',border:'1px solid white',position:'relative'}}>
              <img height='100%' width='100%' style={{borderRadius:'10px'}} src={`./${url}`} alt='na'/>
              <span onClick={(e)=>{media.current.click()}} style={{position:'absolute',right:0,bottom:0,height:'25px',cursor:'pointer'}}><ModeIcon/></span>
              </span>
              </>
              :
              <span style={{height:'50px',width:'80px',background:'white',borderRadius:'10px',marginRight:'20px',border:'1px solid white',position:'relative'}}>
              <img height='100%' width='100%' style={{borderRadius:'10px'}} src='./prof.jpg' alt='na'/>
              <span onClick={(e)=>{media.current.click()}} style={{position:'absolute',right:0,bottom:0,height:'25px',cursor:'pointer',color:'grey'}}><ModeIcon/></span>
              </span>
              }
             
              <input onChange={handleInputMedia} type='file' ref={media} style={{display:'none'}}/>
              <Button style={{border:'1px solid white'}} onClick={handleLoginOut} color="inherit">Logout</Button>
              <Button style={{marginLeft:'15px',border:'1px solid white'}} onClick={handleAcc} color="inherit">Delete account</Button>
              </>
              :
              <>
              <Button style={{border:'1px solid white'}}  color="inherit"><NavLink  style={{color:'white',textDecoration:'none'}} to={'login'}>Login</NavLink></Button>
              <Button style={{marginLeft:'15px',border:'1px solid white'}} color="inherit"><NavLink  style={{color:'white',textDecoration:'none'}} to={'register'}>Register</NavLink></Button>
              </>
            }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Nav