import React,{useState,useEffect,useContext} from 'react'
import {Card,CardContent,TextField,Button, Container} from '@mui/material'
import { loadTrx } from '../axios/loadTrx'
import { uploadTrx } from '../axios/uploadTrx'
import { updateTrx } from '../axios/updateTrx'
import {styled} from 'styled-components'
import TabData from './TabData'
import { appData } from '../context/Context'
import { useNavigate } from 'react-router-dom'


const CARD=styled(Card)`
min-height:100px;
display:flex;
justify-content:start
;
`

const CARDCONTENT = styled(CardContent)`
  width: 100%;
  @media (max-width: 960px) {
    width:60%;
  }
`

function Main() {

  const[details,setDetails]=useState({
        amount:'',
        description:'',
        date:''
      })
     
  const[editTrx,setEditTrx]=useState({})
    
  const[trxs,setTrxs]=useState([])

  const[open,setOpen]=useState(true)

  const {token,userid}=useContext(appData)

  useEffect(()=>{
    loadData() 
  },[details,editTrx])


  const navigate=useNavigate()

  const loadData=async()=>{
      let res=await loadTrx(userid);
      setTrxs(res)
      }
    
  const handleDetails=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
       }
    
  const handleSubmission=async()=>{
        for(let key in details)
        {
            if(details[key].trim()==='')
            {
                console.log(key)
                alert('fill all details')
                return
            }
        }
        if(isNaN(details.amount))
        {
        alert('invalid amount!');
        return;
        }
        if(!isNaN(details.description))
        {
          alert('invalid description');
          return;
        }
    
        await uploadTrx(details,userid)
        setDetails({   
        amount:'',
        description:'',
        date:''})
     }

  const handleSubmit=(e)=>{
        e.preventDefault()
       }

  const handleEditTrx=(e)=>{
        setEditTrx({...editTrx,[e.target.name]:e.target.value})
       }
    
  const handleEditTrxSubmission=async()=>{
        for(let key in editTrx)
        {
            if(editTrx[key].toString().trim()==='')
            {
                alert('fill all details')
                return
            }
        }
        if(isNaN(editTrx.amount))
        {
        alert('invalid amount!');
        return;
        }
        if(!isNaN(editTrx.description))
        {
          alert('invalid description');
          return;
        }
    
        await updateTrx(editTrx)
        setOpen(!open)
        loadData()
        setEditTrx({   
        amount:'',
        description:'',
        date:''})
     }

  return (
  
<>
{
  token ?
<>
<br/>

<Container>
<form onSubmit={handleSubmit}>
<CARD>
<CARDCONTENT>
{
 open
 ?
  <>
  <TextField label='Amount' name='amount' value={details.amount} onChange={handleDetails} style={{marginLeft:'30px',marginTop:'5px'}}/>
  <TextField label='Description' name='description' value={details.description} onChange={handleDetails} style={{marginLeft:'30px',marginTop:'5px'}}/>
  <input type='date' name='date' value={details.date} onChange={handleDetails} style={{textTransform:'uppercase',height:'53px',minWidth:'15%',cursor:'text',
  textAlign:'center',color:'grey',borderRadius:'4px',outline:'none',border:'1px solid lightgrey',marginLeft:'30px',marginTop:'5px'}}/>
  <Button size='large' variant='contained' onClick={handleSubmission} style={{marginLeft:'30px',marginTop:'5px'}}>Add Transaction</Button>
  </>
  :
  <>
  <TextField label='Amount' name='amount' value={editTrx.amount} onChange={handleEditTrx} style={{marginLeft:'30px',marginTop:'5px'}}/>
  <TextField label='Description' name='description' value={editTrx.description} onChange={handleEditTrx} style={{marginLeft:'30px',marginTop:'5px'}}/>
  <input type='date' name='date' value={editTrx.date} onChange={handleEditTrx} style={{textTransform:'uppercase',height:'53px',minWidth:'15%',cursor:'text',
  textAlign:'center',color:'grey',borderRadius:'4px',outline:'none',border:'1px solid lightgrey',marginLeft:'30px',marginTop:'5px'}}/>
  <Button size='large' variant='contained' onClick={handleEditTrxSubmission} style={{marginLeft:'30px',marginTop:'5px'}}>Update Transaction</Button>
  </>
}
</CARDCONTENT>
</CARD>
</form>

<br/>

<TabData data={trxs}  loadData={loadData} setEditTrx={setEditTrx} open={open} setOpen={setOpen} />
</Container>
</>
:
navigate('/login')
}
</>)}

export default Main