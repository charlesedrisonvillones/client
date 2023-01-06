import LoginForm from "./components/loginform";
import RegistrationForm from "./components/registration";
import Profile from "./components/profile";

function App() {
  return (
    <div className="page">
      <LoginForm />
      <RegistrationForm />
      <Profile />

    </div>
   
  );
}

export default App;

// import './loginform.css';
// import { useState, useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";
// import Login from './components/loginform';
// import Register from './components/registration';
// import Profile from './components/profile';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   const setAuth = boolean => {

//     setIsAuthenticated(boolean)

//   }
// //authenticated ? renderApp() : renderLogin();
//   return (
//     //router to redirect and check authentication
//     <div className="App">

//       <Router>
//         <div>
//           <Routes>
//             <Route exact path='/login' element={!isAuthenticated ? (<Login setAuth={setAuth}/> ): (
//               <Navigate to='/profile'/>
//             ) } ></Route>
//             <Route exact path='/register' element={!isAuthenticated ? (<Register setAuth={setAuth}/> ): (
//               <Navigate to='/profile'/>
//             ) }></Route>
//             <Route exact path='/profile' element={isAuthenticated ? (<Profile setAuth={setAuth}/> ): (
//               <Navigate to='/login'/>
//             ) }></Route>
//           </Routes>
//         </div>
//       </Router>
//     </div>
//   );
// }

// export default App;