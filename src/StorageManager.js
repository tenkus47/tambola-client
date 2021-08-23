import { createProfile } from "./helper/serverRequests";


const compareandswap=(a,b)=>{
  if (a !== 0 && b !== 0) {
    if (a > b) {
      var d = a;
      a = b;
      b = d;
    }
  }

  return [a,b]
}


function getRandomColor() {
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  let a = 0.4
  return `rgba(${r},${g},${b},${a})`
}

export default function UserList(state = [], action = { data: [] }) {
  switch (action.type) {
    case "sheetgenerate":
      var color=getRandomColor();
      var Ticket = [];
      var j = 0;
      var numberOfTickets = action.data.length / 3;
      

      for (var i = 0; i < numberOfTickets; i++) {
        
        
        for (var h = 0; h < action.data[j].length; h++) {

         var s= compareandswap(action.data[j][h],action.data[j+1][h]);
         action.data[j][h]=s[0]
         action.data[j+1][h]=s[1]

          s= compareandswap(action.data[j+1][h],action.data[j+2][h]);
         action.data[j+1][h]=s[0]
         action.data[j+2][h]=s[1]

          s= compareandswap(action.data[j][h],action.data[j+2][h]);
         action.data[j][h]=s[0]
         action.data[j+2][h]=s[1]

          s= compareandswap(action.data[j+1][h],action.data[j+2][h]);
         action.data[j+1][h]=s[0]
         action.data[j+2][h]=s[1]

          s= compareandswap(action.data[j][h],action.data[j+1][h]);
         action.data[j][h]=s[0]
         action.data[j+1][h]=s[1]

         
        }

        Ticket = [action.data[j], action.data[j + 1], action.data[j + 2]]; 
         
       
          createProfile(Ticket,color)
          // createuserfunction(Ticket,color);
        j = j + 3;
      }

      return state;

    default:
      return state;
  }
}
