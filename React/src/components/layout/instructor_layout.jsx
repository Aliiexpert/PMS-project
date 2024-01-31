import { useState } from "react";
import React from 'react'
import Navbar from '../instructor/navbar'
import Sidebar from '../instructor/sidebar'
import Home from "../instructor/home";
import Teams from "../instructor/Team-management/teams";
import Tasks from "../instructor/Task-management/tasks";
import Projects from "../instructor/Project-management/project";
import Reports from "../instructor/Reports/reports";
import Trainees from "../instructor/Trainee-management/trainee";
import Request from "../instructor/request/request";
import Profile from "../instructor/profile/profile";

const Instructor_layout = () => {
  const [component, setComponent] = useState("HOME");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const updateState = (newState) => {
    setComponent(newState);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
        <div className=" w-screen h-screen flex flex-col bg-[#efebea]">
          <div>
          <Navbar updateState={updateState} toggleSidebar={toggleSidebar} />
          </div>
            <div className="flex h-full">
            <div className="w-1/5">
          <Sidebar updateState={updateState} />
            </div>
            <div className="h-full w-4/5">
            {component === "HOME" && <Home sidebarOpen={sidebarOpen} />}
            {component === "PROFILE" && <Profile/> }
            {component === "TEAMS" && <Teams />}
            {component === "TRAINEES" && <Trainees/>}
            {component === "TASKS" && <Tasks />}
            {component === "PROJECTS" && <Projects />}
            {component === "REPORTS" && <Reports />}
            {component === "REQUEST" && <Request/>}
            </div>
            </div>
        </div>
    </div>
  );
}

export default Instructor_layout;


// <div className=" w-screen h-screen flex flex-col bg-[#efebea]">
//           <Navbar updateState={updateState} toggleSidebar={toggleSidebar} />
//           <div className="w-full h-full  bg-red-700">
//             <Sidebar updateState={updateState} />
//             {component === "HOME" && <Home sidebarOpen={sidebarOpen} />}
//             {component === "PROFILE" && <Profile/> }
//             {component === "TEAMS" && <Teams />}
//             {component === "TRAINEES" && <Trainees/>}
//             {component === "TASKS" && <Tasks />}
//             {component === "PROJECTS" && <Projects />}
//             {component === "REPORTS" && <Reports />}
//             {component === "REQUEST" && <Request/>}
//           </div>
//         </div>
