import { useState } from "react";
import React from 'react'
import Navbar from '../traineee/navbar'
import Sidebar from '../traineee/sidebar'
import Home from "../traineee/home";
import Teams from "../traineee/Team-view/teams";
import Tasks from "../traineee/Project-view/task";
import Projects from "../traineee/Project-view/project";

const Trainee_layout = () => {
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
          <Navbar updateState={updateState} toggleSidebar={toggleSidebar} />
          <div className="w-full h-full flex">
            <Sidebar updateState={updateState} />
            {component === "HOME" && <Home sidebarOpen={sidebarOpen} />}
            {component === "TEAMS" && <Teams />}
            {component === "TASKS" && <Tasks />}
            {component === "PROJECTS" && <Projects />}
          </div>
        </div>x
    </div>
  );
}

export default Trainee_layout;
