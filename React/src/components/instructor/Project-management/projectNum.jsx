import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {CommandLineIcon} from '@heroicons/react/24/outline'

const ProjectNum = () => {
  const [totalProjects, setTotalProjects] = useState(0);

  const getTotalProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/project/getTotalProjects");
      if (data.response) {
        setTotalProjects(data.response);
      }
    } catch (error) {
      console.error("Error fetching total trainees:", error);
    }
  };
  

  useEffect(() => {
    void getTotalProjects();
  }, []);

  return (
    <>
    <div className="w-full lg:w-1/5 p-4 mx-auto my-6 bg-indigo-200 rounded-lg shadow-md">
      <div className="text-center">
      <div className='flex'>
      <CommandLineIcon className='text-purple-700' style={{ width: '40px', height: '40px' }} />
        <h2 className="text-3xl font-semibold text-purple-500 mb-4">Project List</h2>
        </div>
        <div className="bg-white p-6 rounded-lg">
          {/* Set the size of the icon here */}
          {/* Rest of your content */}
          <p className="text-lg font-medium text-gray-800">Total Projects: {totalProjects}</p>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default ProjectNum;