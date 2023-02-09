// import LoginForm from "./components/loginform";
// import RegistrationForm from "./components/registration";
// import Profile from "./components/profile";

// function App() {
//   return (
//     <div className="page">
//       <LoginForm />
//       <RegistrationForm />
//       <Profile />

//     </div>
   
//   );
// }

// export default App;

import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate
} from "react-router-dom";
import Login from './components/loginform';
import Register from './components/registration';
import Profile from './components/profile';
import DisplayPigs from './components/displayPigs';
import DisplayFeeds from './components/displayFeeds';
import DisplayMedicines from './components/displayMedicines';
import Dashboard from './components/Dashboard';
import Nav from 'react-bootstrap/Nav';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false) // set to false when done (para d login ng login)
  const navigate = useNavigate()

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
  console.log(isAuthenticated)

const verify = async() => {
  const token = localStorage.getItem("token")
  console.log("b")
  try { 
    const response = await fetch(
        `http://localhost:8000/verify?token=${token}`,{
            method: "GET",
            headers: {"Content-type": "application/json"},
            
           
        }
   
    )
    const result = await response.json();
    setIsAuthenticated(result)
    console.log(result)
    console.log("b")
   
   
    
} catch (error) {
    console.log(error)
    
}
}
  useEffect(()=>  {
    
    verify()

}

  ,[])

  
function StackedExample() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link eventKey="link-1" href="/pigs">Pigs</Nav.Link>
      <Nav.Link eventKey="link-2"href="/feeds">Feeds</Nav.Link>
      <Nav.Link eventKey="link-3"href="/medicines">Medicines</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
    </Nav>
  );
}


//authenticated ? renderApp() : renderLogin();
  return (
    //router to redirect and check authentication

  
    <div className="App" style={{display:"flex", height: "100vh"}}>
      <div style={{background: "white", width: "200px", height: "100%"}}>
      <StackedExample/>
        </div>
     <div className="pahina" style={{textAlign: "center", width:"100vw", padding:"0 50px"}}>
        <div>
          <Routes>
            <Route path="/" element={<p>Dashboard dapat!</p>} />
            <Route exact path='/login' element={!isAuthenticated ? (<Login setAuth={setAuth}/> ): (
              <Navigate to='/profile'/>
            ) } ></Route>
            <Route exact path='/register' element={!isAuthenticated ? (<Register setAuth={setAuth}/> ): (
              <Navigate to='/profile'/>
            ) }></Route>
            <Route exact path='/profile' element={isAuthenticated ? (<Profile setAuth={setAuth}/> ): (
              <Navigate to='/login'/>
            ) }></Route>
            <Route exact path='/pigs' element={isAuthenticated ? <DisplayPigs/>:(<Login setAuth={setAuth}/> )}> </Route>
            <Route exact path='/feeds' element={isAuthenticated ?<DisplayFeeds/>:(<Login setAuth={setAuth}/> )}> </Route>
            <Route exact path='/medicines' element={isAuthenticated ?<DisplayMedicines/>:(<Login setAuth={setAuth}/> )}> </Route>
            <Route exact path='/Dashboard' element={isAuthenticated ?<Dashboard />:(<Login setAuth={setAuth}/> )}> </Route>
          </Routes>
        </div>
      
      
    </div>
    
      
    </div>
  );
}


export default App;