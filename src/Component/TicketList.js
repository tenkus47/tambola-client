import React,{useEffect, useState} from 'react'
import TicketView from './TicketView'
import {serverURL} from '../server'
import axios from 'axios'


function TicketListSelf({list=[],id='0'}) {
var [lists,setlist]=useState([])
const getsingle=()=>{
  if(id==='0'||id===null||id===''){
    axios.get(serverURL+'/getlist').then(res=>setlist(res.data.splice(0,10)))
  }
   else if(/^\d+$/.test(id)&&id!==''){
        axios.get(serverURL+'/getgroup/'+id).then(res=>setlist(res.data))
    }
 } 


 useEffect(()=>{
   getsingle();
 },[id])

useEffect(()=>{

},[])

   
if(lists.length!==0 && id!==''){
 return(

   

  <div style={{display:'flex',alignItems:'center',flexDirection:'column',flexWrap:'wrap'}}>
  <div style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>

  {lists.map((item,index)=>
   
   (
       <div key={index} style={{margin:20}}>
              <div style={{color:'red',fontSize:15}}> {item?.username} </div>

        <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{color:'black'}}>Ticket:{item?.id}</div>
              {item.username==='Available' ?(<div>not sold</div>):(<div style={{color:'green'}}> sold</div>)} 
            </div>
            
        <TicketView ticketdata={item?.ticket} list={list} color={`rgba(${item?.username.length/item?.id},${200/item?.id},${(item?.username.length*5)/item?.id},0.2)`} />
           </div>
   ))
   } 
  </div>
  </div>

 )


}


else{
  return null
}
  
 



}

export default TicketListSelf
