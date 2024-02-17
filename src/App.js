import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route,nav, Nav,NavLink  } from 'react-router-dom';
import SignUp from './component/SignUp';
import Login from './component/Login';
import Profile from './component/Profile';
import Feed from './component/Feed';
import Users from './component/Users';
import Posts from './component/Posts';
import Followers from './component/Followers';
import Following from './component/Following';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { AuthProvider } from './component/AuthContext';


function App() {

  
  return (
    <AuthProvider>
    <BrowserRouter> 


    <Routes>
     <Route path='/'  isActive={() => isActive('/')} element={<SignUp/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/profile'  isActive={() => isActive('/profile')} element={<Profile/>}/>
     <Route path='/feed' element={<Feed/>}/>
     <Route path='/users' element={<Users/>}/>
     <Route path='/posts' element={<Posts/>}/>
     <Route path='/followers' element={<Followers/>}/>
     <Route path='/following' element={<Following/>}/>


    </Routes>
    </BrowserRouter>
    </AuthProvider>
 
    
   );
}

export default App;
