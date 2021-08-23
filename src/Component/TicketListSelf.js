import React,{useEffect,useState} from 'react'
import TicketView from './TicketView'

import { removeUser } from "../helper/serverRequests"
import {serverURL} from '../server'
import axios from 'axios'


function TicketListSelf({page,list=[],id='0'}) {
var [lists,setlist]=useState([])
var [ids,setid]=useState(id)
const getsingle=()=>{
  // if(id==='0'||id===null||id===''||id==='undefined'){
  //   axios.get(serverURL+'/getlist').then(res=>setlist(res.data.sort()))
  // }
    if(/^\d+$/.test(id)&&id!==''){
        axios.get(serverURL+'/getList/'+id).then(res=>setlist(res.data))
    }
 } 


 useEffect(()=>{
     setid(id)
   getsingle();
 },[id])



   
const handleClick=(id)=>{
    removeUser(id)
    setlist(prev=>[...prev]);
    setTimeout(()=>{
      window.location='/adminpage'

    },500)
}
if(lists.length!==0 && ids!==''){
 return(

   
   

  <div style={{display:'flex',alignItems:'center',flexDirection:'column',flexWrap:'wrap'}}>

  <div style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>

  {lists.map((item,index)=>
   
   (
       <div key={index} style={{margin:20}}>
         
         <div style={{color:'black',fontSize:15}}> {item?.username} </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{color:'black'}}>Ticket:{item?.id}</div>
                {item.username==='Available' ?(<div>not sold</div>):(<div style={{color:'green'}}> sold</div>)} 
              <div> <button onClick={()=>handleClick(item?.id)} style={{height:20}}>x</button></div>
            </div>
            
        <TicketView ticketdata={item?.ticket} list={list} color={item?.color} />
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
