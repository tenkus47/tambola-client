import axios from "axios";
import { serverURL } from "../server";

export const createProfile=(Ticket=[],color)=>{
 axios.post(serverURL+'/createProfile',{
        Ticket,
        color
     }).then(()=>{
        console.log('datacreated')
    }).catch(
        err=>console.log(err)
    )
   
}


export const removeUser=(id)=>{
    axios.delete(serverURL+`/removeTicket`,{
       params:{id}
    }).then(res=>console.log(res)).catch(
        err=>console.log(err)
    )
} 