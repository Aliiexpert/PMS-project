import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Cookie from "universal-cookie";

const ProjectDeadline = () => {
  const cookie = new Cookie();
  const [Projects, setProjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const getUserIdFromCookie = () => {
    const authCookie = cookie.get('auth');
    if (authCookie && authCookie.userId) {
      return authCookie.userId;
    }
    return null;
  };

  const getAllProjects = async () => {
    const userId = getUserIdFromCookie();
    try {
      const { data } = await axios.get("http://localhost:3000/project/getAllProjects", {
        params: {
                instructorId: userId,
                }

      });
      console.log(data);
      if (data.response) {
        const formattedProjects = data.response.map(item => ({
          projectId: item.projectId,
          projectTitle: item.projectTitle,
          deadlineDate: item.deadlineDate,
        }));
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  useEffect(() => {
    void getAllProjects();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = Projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex space-x-2'>
      <div className="w-3/5  text-black">
        <table className="w-full h-full text-sm border-collapse bg-white overflow-y-auto">
          <thead className="bg-purple-700 text-white">
            <tr className="text-left">
              <th className="p-3 border border-gray-300">Project Name</th>
              <th className="p-3 border border-gray-300">Project Deadline</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                <td className="p-3 border border-gray-300">
                  <p>{project.projectTitle}</p>
                </td>
                <td className="p-3 border border-gray-300">
                  <p>{project.deadlineDate}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 bg-purple-700 text-white rounded"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastProject >= Projects.length}
            className="px-3 py-1 bg-purple-700 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-2/5 ">
        <div className="h-full text-black text-sm border-collapse bg-white">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default ProjectDeadline;
