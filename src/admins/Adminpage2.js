import axios from 'axios';
import React,{useState,useEffect} from 'react'
import ShowAllList from '../Component/ShowAllList';
import { serverURL } from '../server';
import ShowAvailable from '../Component/ShowAvailable';
import Timer from '../Component/Timer';




function Adminpage1() {
  const [mobile,setmobile]=useState();

var [clickedpass,SetClickedpass]=useState('');
var [pass]=useState('1919')
var [open,setOpen]=useState(false);
const [option,setOption]=useState([])
const [ticketList,setTicketlist]=useState([]);
const [username,setuserName]=useState();
const [numberofSale,setNumberofSale]=useState(0);
const [loading,setloading]=useState(false);
const [bought,setbought]=useState([]);
function checkpass(){
    var v1=parseInt(pass);
    var v2=parseInt(clickedpass);
    
    if(v1===v2){
        setOpen(true)
      }
      else{
        alert('please goto player zone')
      }
}
useEffect(()=>{

    const fetcher=async()=>{
      setloading(true)
      const res=await axios.get(serverURL+'/getList')
      var response=res.data.filter(item=>item.agentName==='sonam');
      setNumberofSale(response.length)
      setbought(response)
       var ar=res.data.sort((a,b)=>a.id-b.id)
       var filtered=ar.filter(item=>item.username==='Available')
      setTicketlist(filtered);
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
    console.log(option,username)
// eslint-disable-next-line no-restricted-globals
     if (confirm("Press a button!")) {
    await axios.patch(serverURL+'/changeusername',{
    id:option,
    username,
    agentName:'sonam',
    mobile:mobile
     })
     setOption([]);
     setuserName(null)
     setmobile(0)

    } else {
        alert("You pressed Cancel!");
      }

  }

if(!open){
  return (
    <div className='passcheck'
      style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:'20%'}}
      > 
          
 <input type='text'  
 placeholder='passcode'
 style={{textAlign:'center',margin:'10px 0'}}
 onChange={e=>SetClickedpass(e.target.value)}/>
 <button onClick={checkpass}
 style={{
     backgroundColor:'orange'
 }}> OK</button>
      </div>
  )
}
if(open){

    return (
        <div>
          <Timer/>
            <center>
                <h1>Hello Sonam la sold ({numberofSale}) tickets</h1>

<div className='agendsellings' style={{backgroundColor:'blue',paddingBottom:20,color:'white'}} >
<h4>your total tickets</h4>

<div className='agent-sold' style={{display:'flex',padding:'0 20px'}}>
  {
    bought.map((item,index)=>(<div key={index} style={{margin:'0 10px',backgroundColor:'red',color:'white',padding:'0 2px',width:30,border:'1px solid black'}}>
      {item.id}
      </div>))
  }
  </div>   
</div>

            <div className='buyerSection'>
         
        <h3>Buyer Section</h3>

   <h5>Option choose:</h5>{option.map((item,index)=>
   <input type='button' key={index}  onClick={e=>optionremove(e.target.value)} style={{marginRight:10,width:30,padding:0,backgroundColor:'black',color:'white'}} value={item}/>)}
   <br/>
       {loading?(<h3>Loading</h3>):(
         <select className='listOfTickets'
         defaultValue={ticketList[0].id}
         style={{marginRight:20,padding:3,marginTop:40}}
         onChange={(e)=>setOption(prev=>[...prev,e.target.value])}
         >{
       ticketList.map((item,index)=>(
         <option key={index} className='item-tickets'>
           {item.id}
           </option>
       ))}</select>
       )
        }
        <input type='text' placeholder='username' onChange={(e)=>setuserName(e.target.value)} />
        <input type='text' placeholder='mobile' onChange={(e)=>setmobile(e.target.value)} />
        <button type='button' onClick={OrderTicket}> placeOrder </button>
    </div>
</center>
<center>

<ShowAllList/>
</center>
<center>
  <div style={{marginBottom:20}}>
  <ShowAvailable/>

  </div>

</center>






        </div>
    )
}
return null;
    
}

export default Adminpage1
