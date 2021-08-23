import React from 'react'
import TicketView from './TicketView'

function TicketView2({tickets=[],loading}) {
    
    if(loading){
        return(
            <h2>Loading....</h2>
        )
    }
    
    if(tickets.length>0){
    return (
        <div className='listOfTicket' style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around',backgroundColor:'hsl(28, 93%, 72%)'}}>
            {
            tickets.map((item,index)=>
            <div key={index}>
                <div className='ticketDetails' style={{display:'flex',justifyContent:'space-around',margin:'-10px'}}>
                      <h5>{item.id}</h5>
                      {item?.username && <h5>{item?.username}</h5>}
                      {item?.username!=='Available' ?(
                     <h5 style={{color:'green'}}>sold</h5>
                      ):(<h5 style={{color:'red',fontSize:15 }}>unsold</h5>)}
                    </div>

                                        <TicketView ticketdata={item?.ticket} color={item?.color}/>
                </div>)
            }
        </div>
    )
        }
        return null
}

export default TicketView2
