import React,{useEffect,useState} from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../server'
import {socket} from '../socket'
import TicketView2 from './TicketView2'
import { useDispatch,useSelector } from 'react-redux'
import { Pagination } from './Pagination'
import { soundfile } from '../soundtext/soundtext';


function ShowAllList() {
   const dispatch=useDispatch();
  var voices={
    default: false,
lang: "en-US",
localService: true,
name: "Microsoft Zira - English (United States)",
voiceURI: "Microsoft Zira - English (United States)"
  };
   const [tickets,setTickets]=useState([])
const [loading,setLoading]=useState(false)
const { speak } = useSpeechSynthesis();
const [currentPage,setCurrentPage]=useState(1)
const [postPerPage]=useState(12)
const {random,list} = useSelector(state => state.NumberGenerate)
const [counts,setCounts]=useState();
useEffect(()=>{
     const fetchTickets=async()=>{
       setLoading(true) 
        var res=await axios.get(serverURL+'/getList')
        setTickets(res.data)
        setLoading(false);
        }
      fetchTickets();  
   

    },[])

    function  cal(){
    
        var s= tickets.filter(item => item.username ==='Available').length;
        if(s===0||s===counts){
            window.location='/Ticketlist'
        }
        setCounts(s);
         }

useEffect(()=>{
  socket.connect()
  socket.on('connect',()=>{
      console.log('connected')
  })
  socket.on('number',(item,list)=>{
      dispatch({type:'update',item,list})
  })
 
  socket.on('gamefinished',(data)=>{
      window.location='/play';
    })
  socket.on('winnerlist',data=>{
      // setwinnerlist(data)
  })
  socket.on('gotoend',(data)=>{
      alert(data)
  })
  socket.on('serverdown',(data)=>{
      alert(data)
      window.location='/play'
  })
  return ()=>socket.disconnect();
},[])


useEffect(()=>{
  var single=''
  if(random>1&&random<10){
    single='single number ';
  }
   speak({
       text:soundfile[random-1],
       voice:voices
   })
   setTimeout(()=>{
     speak({
       text:`${single} ${random}`,
       voice:voices
   })
   },1500)
  
},[random])

    //get current post

    const indexOfLastPost=currentPage*postPerPage;
    const indexOfFirstPost=indexOfLastPost-postPerPage;
    const currentPosts=tickets.slice(indexOfFirstPost,indexOfLastPost).sort((a,b)=>a.id-b.id);
    
    //change page

    const paginate=(number)=>{
        setCurrentPage(number)
    }
       
    return (
        <div>
         <nav style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <Link to='/play' style={{backgroundColor:'orange',padding:10,textDecoration:'none',color:'black' ,borderRadius:10}}>Go to play room</Link>
         </nav>
         <br/>
         
         {random?( <center><div className='anounced-num'> {random}</div></center>):(null)}
      <br/>

        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
        <Pagination postsPerPage={postPerPage} TotalPosts={tickets.length} paginate={paginate}
        currentpage={currentPage}
        />

        </div>
          {!random && <center>
        <div className='ticketLeft' style={{marginTop:10}} >
           {counts}  Ticket left <button onClick={cal}>refresh</button>
            </div>
            </center>}
           <div className='ticketListing' style={{marginTop:30}}> 
   <TicketView2 tickets={currentPosts} loading={loading}/>
            </div>
    
    
        </div>

    
    )

}

export default ShowAllList
