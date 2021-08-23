import React, { useState,useRef,useEffect } from "react";
import {serverURL} from '../server'
import moment from 'moment'
import {useDispatch,useSelector} from 'react-redux'
import {socket} from '../socket'
import './style/TicketGenerator.css'
import TicketList from './TicketListSelf'
import axios from "axios";
import Sheetgenerate from "./Sheetgenerate";
import ShowAllList from './ShowAllList'
import ShowAvailable from "./ShowAvailable";
import { MongooseDocument } from "mongoose";
function TicketGenerate() {


  const myticket=useRef(null);
  const [option,setOption]=useState([])
  const dispatch=useDispatch()
  const [ticket, setTicket] = useState(null);
  const [sheet, setSheet] = useState();
  const [clicked,setclicked]=useState(false);
  const [message, setmessage] = useState(null);
  const {list} = useSelector(state => state.NumberGenerate)
  const [showtable,Setshowtable]=useState(null)
  const [ticketList,setTicketlist]=useState([]);
  const [username,setuserName]=useState();
  const [mobile,setmobile]=useState();
  const [loading,setloading]=useState(false);
  const [time,setTime]=useState();
const [key,setKey]=useState();
const [pass,setpass]=useState(0);
const [pass1,setpass1]=useState(0);
const [open,setOpen]=useState(false);
const [selectlist,setSelectlist]=useState([]);
  useEffect(()=>{
    socket.connect()
    socket.on('number',(item,list)=>{
      dispatch({type:'update',item,list})
  })
    
    return ()=>socket.disconnect();
},[socket])
useEffect(()=>{

  const fetcher=async()=>{
    setloading(true)
    const res=await axios.get(serverURL+'/getList')
    const pass=await axios.get(serverURL+'/privatekey');
    setTicketlist(res.data);
    var ar=res.data.sort((a,b)=>a.id-b.id)
    var filtered=ar.filter(item=>item.username==='Available')
    setSelectlist(filtered);
    setpass(pass.data[0].key);
    setloading(false)
  }
  fetcher()
},[])

const optionremove=(v)=>{
  setOption(prev=>{
    var r= prev.filter(item=>item.value===v);
    return r;
  })
}

const OrderTicket=async()=>{
  console.log(option,username,mobile)
  await axios.patch(serverURL+'/changeusername',{
  id:option,
  username,
  mobile:mobile
   })
   alert('order placed')
   setOption([]);
   setuserName(null)
   setmobile(0)
}

  function mulgenerator(data){
      dispatch({
        type:'sheetgenerate',
        data
        
      })
      setTimeout(()=>{
        window.location='/adminpage'
      },1000)
    
   
  }

  const clickStop=()=>{
    socket.emit('starts',false)
    console.log('stop')
  }
  const clickmessage=()=>{
    socket.emit("message",message);
  }
  const clickend=()=>{
    axios.get(serverURL+'/system/reboot').then(res=>{
      console.log(res)
    });
  }
  const clickreset=()=>{
    // eslint-disable-next-line no-restricted-globals
    var r = confirm("Press a button!");
    if(r===true){
      axios.get(serverURL+'/reset').then(res=>{
        console.log('reset')
      });
      alert('data is wiped and reset')
    }
    else{
      alert('nothing has changed')
    }
   
  }

  const clickplayerreset=()=>{
    // eslint-disable-next-line no-restricted-globals
    var r = confirm("Press a button!");
    if(r===true){
      axios.get(serverURL+'/playerremove').then(res=>{
        console.log('reset')
      });
      alert('playerdata is wiped and reset')
    }
    else{
      alert('nothing has changed')
    }
   
  }

  const clickStart=()=>{
      console.log('start')
      socket.emit('starts',true)
    
}
const submitTime= ()=>{
  axios.post(serverURL+'/Timings',{
    time
  }).then(res=>console.log(res))
  .catch(e=>
    console.log(e)
  )
}
const createKey=()=>{
 axios.post(serverURL+'/privatekey',{
   key:key
 }).then(r=>console.log('key logged'))

}

function passcheck(){
 var value1=parseInt(pass)
 var value2=parseInt(pass1)

  if(value1===value2){
    setOpen(true);
  }
}


if(!open){
  return(
    <div>
      <input  type='text' onChange={e=>setpass1(e.target.value)}/>
      <button  onClick={passcheck} >Submit</button>
      </div>
  )
}
if(open){


  return (
    <>
    <div  className='TicketGenerate'
    style={{ display: "flex", 
              justifyContent: "center",
              alignItems:'center',
              flexDirection:'column',
              borderRadius:10,
              backgroundColor:'lime',
              maxWidth:500,
              padding:25 }}>
 <h1 style={{textAlign:'center'}}>Lhasa Tambola</h1>
 <input type='text' placeholder='key' onChange={e=>setKey(e.target.value)}/>
 <button onClick={createKey}>createKey</button>
      <form style={{
        textAlign:'center'
      }}>
       
      
      <div style={{marginTop:20,display:"flex",marginBotton:10,alignItems:'center',flexDirection:'column' }}>
       
          <input
          min='1'
          max='6'
          style={{padding:7,borderRadius:3}}
          placeholder='no. of ticket in sheet' type='text' onChange={(e)=>setSheet(e.target.value)}/>
          <Sheetgenerate numberOfTicket={sheet} create={mulgenerator}/>
      
      </div>
     
        
      </form>

      <div className='buyerSection'>
        <h3>Buyer Section</h3>

   <h5>Option choose:</h5>{option.map((item,index)=>
   <input type='button' key={index}  onClick={e=>optionremove(e.target.value)} style={{marginRight:10,width:30,padding:0}} value={item}/>)}
   <br/>
       {loading?(<h3>Loading</h3>):(
         <select className='listOfTickets'
         defaultValue={0}
         onChange={(e)=>setOption(prev=>[...prev,e.target.value])}
         >{
       selectlist.map((item,index)=>(
         <option key={index} className='item-tickets' >
           {item.id}
           </option>
       ))}</select>
       )
        }
        <input type='text' placeholder='username' onChange={(e)=>setuserName(e.target.value)} />
        <input type='text' placeholder='mobile' onChange={(e)=>setmobile(e.target.value)} />
        <button type='button' onClick={OrderTicket}> placeOrder </button>
    </div>
<div className='Timing'>
  <h3>Set Game Time</h3>
  <input type='datetime-local' onChange={(e)=>setTime(moment(e.target.value)._d)}/> 
  <button onClick={submitTime}>set GameTime</button> 


</div>
      <br/>
      <h1>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
   <div> <button onClick={clickStart} style={{backgroundColor:'green'}} id='start-btn' className='btn-control'>start</button>
      <button onClick={clickStop} id='stop-btn' style={{backgroundColor:'blue'}} className='btn-control'>stop</button>
      <button onClick={clickreset} id='stop-btn' style={{backgroundColor:'orange'}} className='btn-control'>winner reset</button>
      <button onClick={clickplayerreset} id='stop-btn' style={{backgroundColor:'orange'}} className='btn-control'>Playerlist reset</button>

     </div>  
     </div>  
      <div style={{ display:'flex',justifyContent:'center'}}>
      <textarea style={{margin:20}} onChange={e=>setmessage(e.target.value)} placeholder='message'/>
      <button onClick={clickmessage} id='stop-btn' className='btn-control'>send message</button>
      </div>
      <button onClick={clickend} style={{display:'block',backgroundColor:'red'}} id='stop-btn' className='btn-control'>end server</button>
      
        </h1>
    </div>
    
    <center>
     <label htmlFor='ticketsearch' className='searchlabel'>Enter your Group </label>
                 <input
                 id='ticketsearch' 
                 type='text' placeholder='search your Group'
              style={{marginTop:30,padding:10,fontFamily:'sans-serif',color:'purple',borderRadius:10}} 
              onChange={(e)=>{
                  myticket.current=e.target.value
                  setclicked(prev=>!prev)
                  }}/>
            <input type='button' style={{padding:7,marginLeft:10,borderRadius:10}} value='search' onClick={()=>setclicked(prev=>!prev)}/> 
                 </center>

            <TicketList list={list} showtable={showtable} id={myticket.current}/>
            <ShowAllList/> 

            <center>
  <div style={{marginBottom:20}}>
 <ShowAvailable/>

  </div>

</center>
    </>
  );

                }
}

export default TicketGenerate;
