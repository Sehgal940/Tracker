import React from 'react'
import styled from 'styled-components'
import { Box,Typography } from '@mui/material'

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

function Error() {

  return (
    <>
      <Box style={{minHeight:'90vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
      <BOX>
        <Typography style={{textAlign:'center',fontSize:'5rem',color:'grey'}}>ERROR</Typography>
      </BOX>
    </Box>  
    </>

  )
}

export default Error