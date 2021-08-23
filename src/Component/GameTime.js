import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { serverURL } from '../server'
import pic from '../clock.png'

function GameTime() {

    var [time,setTime]=useState([])
useEffect(()=>{
  const fetchtime=async()=>{
var res= await axios.get(serverURL+'/Timings')
var date=new Date(res.data[0].startTime);
var dateu=date.getDate()
var month=date.getMonth()
 var year=date.getFullYear()
var a=date.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })
console.log(a)
var t=` ${dateu}-${month+1}-${year} :: ${a}`
setTime(t)
  }

  fetchtime()
},[])


    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <img src={pic} alt='icond' style={{width:20,height:20,marginRight:10}}/>  {time}
        </div>
    )
}

export default GameTime
