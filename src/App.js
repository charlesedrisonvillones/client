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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // set to false when done (para d login ng login)
  const navigate = useNavigate()

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
//authenticated ? renderApp() : renderLogin();
  return (
    //router to redirect and check authentication

  
    <div className="App">
      <nav>
        <button onClick={()=>navigate("/login")}>Login</button>
        <button onClick={()=>navigate("/register")}>Register</button>
      </nav>
       
     <div className="pahina">
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
            <Route exact path='/pigs' element={<DisplayPigs/>}> </Route>
        
          </Routes>
        </div>
      
      
    </div>
    
      
    </div>
  );
}


export default App;