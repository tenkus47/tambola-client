import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style/ticketView.css'
import {socket} from '../socket'

function TicketView({ticketdata=[],list=[],color}) {
    const listed = useSelector(state => state.NumberGenerate.list)
    const dispatch=useDispatch()

  
    useEffect(()=>{
        socket.on('connect',()=>{       
        socket.on('number',(item,list)=>{
            dispatch({type:'update',item,list})
        })
     
        })
          return ()=>{
            socket.disconnect();
            console.log('disconected')
        };
    },[])

    if(ticketdata?.length!==0){
        return (
            <div className='ticketContainer' style={{backgroundColor:color}}>
                <div className='firstRow Row'>
                    {ticketdata[0].map((item,index)=>(
                      <div className='element' key={index+10} style={
                          list.includes(item)||listed.includes(item)?{
                              backgroundColor:'hsl(207, 57%, 44%)',
                              color:'white',
                          }:{color:'black'}
                      }>
                          {item===0?(''):(item)}</div>
                    ))}
                </div>
                <div className='SecondRow Row'>
                {ticketdata[1].map((item,index)=>(
                      <div className='element' style={
                        list.includes(item)||listed.includes(item)?{
                            backgroundColor:'hsl(207, 57%, 54%)',
                            color:'white'
                        }:{color:'black'}
                    } key={index+20}>{item===0?(''):(item)}</div>
                    ))}
                </div>
                <div className='ThirdRow Row'>
                {ticketdata[2].map((item,index)=>(
                      <div className='element' style={
                        list.includes(item)||listed.includes(item)?{
                            backgroundColor:'hsl(207, 57%, 62%)',
                            color:'white'
                        }:{color:'black'}
                    } key={index+30}>{item===0?(''):(item)}</div>
                    ))}
                </div>
            </div>
        )
    }

    else return null
  
}

export default TicketView
