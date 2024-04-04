import React from 'react'
import {Table,TableContainer,TableCell,TableRow,TableBody,TableHead,Paper} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import {delTrx} from '../axios/delTrx';

function TabData({data,loadData,setEditTrx,open,setOpen}) {
  
  async function delData(id)
  {
    await delTrx(id)
    loadData()
  }
  return (
  <>
  <TableContainer  component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{height:'80px'}} key={'table'}>
            <TableCell align="center"><b>Amount</b></TableCell>
            <TableCell align="center"><b>Description</b></TableCell>
            <TableCell align="center"><b>Date</b></TableCell>
            <TableCell align="center"><b>Edit</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((value) => (
            <TableRow key={value._id}>
              <TableCell align="center">{value.amount}</TableCell>
              <TableCell align="center">{value.description}</TableCell>
              <TableCell align="center">{value.date.substr(0,10)}</TableCell>
              <TableCell align='center'>
              <span onClick={()=>{setEditTrx(value);setOpen(!open);}} style={{marginLeft:'15px',cursor:'pointer',color:'#0047AB'}}><EditIcon/></span>
              <span onClick={()=>{delData(value._id)}} style={{marginLeft:'20px',cursor:'pointer',color:'#D22B2B'}}><DeleteIcon/></span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</>
  )
}

export default TabData