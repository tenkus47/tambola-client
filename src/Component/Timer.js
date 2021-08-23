import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { serverURL } from '../server'

function Timer() {

    const [timerDays,setTimerDays]=useState()
    const [timerHours,setTimerHours]=useState()
    const [timerMinutes,setTimerMinutes]=useState()
    const [timerSeconds,setTimerSeconds]=useState()


    let interval;
    const startTimer=async()=>{
      var res= await axios.get(serverURL+'/Timings')
      const countDownDate=new Date(res.data[0].startTime).getTime();
  
      interval=setInterval(()=>{
       const now=new Date().getTime();
       const distance=countDownDate-now;
       const days=Math.floor(distance/(24*60*60*1000))
       const hours=Math.floor((distance%(24*60*60*1000))/(1000*60*60))
       const minutes=Math.floor((distance%(60*60*1000))/(1000*60))
       const seconds=Math.floor((distance%(60*1000))/(1000))
  
        if(distance<0){
          clearInterval(interval.current)
        }else{
          setTimerDays(days)
          setTimerHours(hours)
          setTimerMinutes(minutes)
          setTimerSeconds(seconds)
        }
      })
  
    }
  useEffect(()=>{
      startTimer();
  })


    return (
        <div className='countdownTimer' style={{display:'flex',justifyContent:'center',color:'#06f1f6',
        textShadow:'1px 1px 7px',margin:10,backgroundColor:'#051817'}}>
            <span>{timerDays} Days </span>-
            <span>{timerHours} Hours </span>-
            <span>{timerMinutes} Minutes </span>-
            <span>{timerSeconds} Seconds </span>
        </div>
    )
}

export default Timer
