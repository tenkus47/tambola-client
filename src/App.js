import "./App.css";
import TicketGenerate from "./Component/TicketGenerate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GameView from "./Component/GameView";
import Sheetgenerate from "./Component/Sheetgenerate";
import ShowAllList from './Component/ShowAllList'
import Adminpage1 from "./admins/Adminpage1";
import Adminpage2 from "./admins/Adminpage2";
import ShowAvailable from "./Component/ShowAvailable";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
function App() {

  const { width, height } = useWindowSize()

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Switch>  
           <Route path="/" exact>
           <Confetti
      width={width}
      height={height}
    />
            <div className='homepage' style={{display:'flex',justifyContent:'center',
          alignItems:'center',width:'100%',height:'100vh',flexDirection:'column'}}> 
              <Link to='/play'><button>Player</button></Link> 
              <Link to='/adminpage1'><button>Agent (Passang)</button></Link>    
              <Link to='/adminpage2'><button>Agent (Sonam)</button></Link>              
              </div>
              
           </Route>
          <Route path="/adminpage" exact>
            
            <TicketGenerate />                                                                     
          </Route>
          <Route path="/play">
       
            <GameView/>
          </Route> 
          <Route path="/adminpage1">
            <Adminpage1/>
          </Route> 
          <Route path="/adminpage2">
            <Adminpage2/>
          </Route> 

          <Route path="/Ticket">
            <Sheetgenerate/>
          </Route> 
          <Route path="/Ticketlist">
            <ShowAllList/>
          </Route> 
          <Route path="/ShowAvailable">
            <ShowAvailable/>
          </Route> 
          
        </Switch>
      </div>
    
    </Router>
  );
}

export default App;
