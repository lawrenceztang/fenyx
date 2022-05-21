import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from 'react';
import useToken from './useToken';
import ClassPage from './pages/Class'


function App() {
  const {token, setToken, deleteToken} = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout token={token} deleteToken={deleteToken}/>}>
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile/>} />
          <Route path="login" element={<Login setToken={setToken}/>} />
          <Route path= "class/:id" element={<ClassPage/>} />
          <Route path= "register" element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
