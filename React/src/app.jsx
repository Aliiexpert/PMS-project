import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth_Layout from "./components/layout/auth_layout";
import Instructor_layout from "./components/layout/instructor_layout";
import Onboarding from './components/auth/onboarding';
import './index.css';
import Trainee_layout from './components/layout/trainee_layout';
import ProtectedRoute from '../src/middleware';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth_Layout />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="instructor" element={
            
            <ProtectedRoute Component={Instructor_layout} />


        } >             </Route>

      <Route path="/trainee" element={<Trainee_layout />} />
    </Routes>
  );
};

export default App;
