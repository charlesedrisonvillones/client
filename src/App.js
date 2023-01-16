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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false) // set to false when done (para d login ng login)
  const navigate = useNavigate()

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
  console.log(isAuthenticated)
//authenticated ? renderApp() : renderLogin();
  return (
    //router to redirect and check authentication

  
    <div className="App">
      
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
            <Route exact path='/feeds' element={<DisplayFeeds/>}> </Route>
            <Route exact path='/medicines' element={<DisplayMedicines/>}> </Route>
            <Route exact path='/Dashboard' element={<Dashboard />}> </Route>
          </Routes>
        </div>
      
      
    </div>
    
      
    </div>
  );
}


export default App;