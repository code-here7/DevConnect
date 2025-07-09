import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import ProjectData from "./pages/Project Components/ProjectData";
import ProfileCreate from "./pages/HomeComponents/Profile components/ProfileCreate";
import MyProjects from "./pages/HomeComponents/Profile components/MyProjects";
import axios from 'axios';
axios.defaults.baseURL = 'https://devconnect-backend.onrender.com';



function App() {
  return (
    <>
       <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
       <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
        <Route
        path="/profileCreate"
        element={
          <PrivateRoute>
            <ProfileCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/projectData/:userId"
        element={
          <PrivateRoute>
            <ProjectData />
          </PrivateRoute>
        }
      />
       <Route
        path="/myProject/:userId"
        element={
          <PrivateRoute>
            <MyProjects />
          </PrivateRoute>
        }
      />
      </Routes>
    </>
  )
}

export default App;
