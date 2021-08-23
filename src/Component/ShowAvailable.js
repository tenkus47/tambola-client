import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { serverURL } from '../server';

function ShowAvailable() {
 
    const [loading,setloading]=useState(false);
    const [ticketList,setTicketlist]=useState([]);
    useEffect(()=>{

        const fetcher=async()=>{
            setloading(true)
            const res=await axios.get(serverURL+'/getList')
            setTicketlist(res.data.sort((a,b)=>a.id-b.id));
            setloading(false)
          }
          fetcher()
    
    
    },[])

    if(loading){
      return  <h3>loading</h3>
    }

    return (
        <div className='availableTickets' style={{display:'flex',marginTop:20,maxWidth:350,alignItems:'center',flexWrap:'wrap',padding:10,flexDirection:'column'}}>
           <nav style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <Link to='/play' style={{backgroundColor:'orange',padding:10,textDecoration:'none',color:'black' ,borderRadius:10}}>Go to play room</Link>
            </nav>
              <br/>
           <div style={{color:'green',fontSize:30}}> Green:Available</div>
           <div style={{color:'red',}}> Red:sold </div>
           <div>
              {ticketList.map((item,index)=>(
        
            <button key={index} type='button' style={item.username==='Available'?{textAlign:'center',width:30,backgroundColor:'lime',marginRight:6,padding:0
         }:{ backgroundColor:'red',color:'white',marginRight:6,width:30,textAlign:'center',padding:0}}> {item.id} </button>
              ))}
            </div>
        </div>
    )
}

export default ShowAvailable
