import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Cookie from "universal-cookie";




const Projects = () => {
    const cookie = new Cookie();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);
    const [teams, setTeams] = useState([]);
    const [selectedProjectId, setselectedProjectId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 4;

    


    const getUserIdFromCookie = () => {
        const authCookie = cookie.get('auth');
        if (authCookie && authCookie.userId) {
        return authCookie.userId;
        }
        return null;
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
        setDimmed(false); 
    };

    const handleEditClick = (Project) => {
        setEditData(Project);
        setEditModalOpen(true);
        setDimmed(true); 
    };

    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false); 
    };
    
    const [createData, setCreateData] = useState({
        projectTitle: '',
        description: '',
        deadlineDate: '',
        teamId: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProjectForDelete, setSelectedProjectForDelete] = useState(null);
    const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDimmed(false);
};

const deleteProject = async (projectId) => {
    try {
        const { data } = await axios.delete("http://localhost:3000/project/deleteProject", {
            params:{
            projectId: projectId,
            }
        });
        console.log(data.response);

        // Update state to remove the deleted project
        // setAssignedProjects(prevProjects => prevProjects.filter(project => project.projectId !== projectId));
        // setUnassignedProjects(prevProjects => prevProjects.filter(project => project.projectId !== projectId));

        // Close the delete modal
        setDeleteModalOpen(false);
    } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
    }
};
const handleDeleteClick = (Projects) => {
    setSelectedProjectForDelete(Projects);

    setDeleteModalOpen(true);
    setDimmed(true);

};

    const contentClassName = isDimmed ? 'dimmed' : '';

    const [Projects, setProjects] = useState([]);
    
    const update = async (updatedData) => {
        try {
            const { data } = await axios.put("http://localhost:3000/project/updateProject",updatedData);
            console.log(data); 
    
            // Update the Trainees state with the updated data
            setProjects(prevProjects => {
                const updatedIndex = prevProjects.findIndex(project => project.projectId === updatedData.projectId);
                if (updatedIndex !== -1) {
                    const updatedProject = [...prevProjects];
                    updatedProject[updatedIndex] = updatedData;
                    return updatedProject;
                }
                return prevProjects;
            });
    
        } catch (error) {
            console.error("Error updating Project:", error);
        }
    };

const getAllProjects = async () => {
        try {
            const userId = getUserIdFromCookie();
            const { data } = await axios.get("http://localhost:3000/project/getAllProjects",{
                params: {
                    instructorId: userId,
                }
            });
            console.log("Res",data)
            if (data.response) {
                const formattedProjects = data.response.map(item => ({
                    projectId: item.projectId,
                    projectTitle: item.projectTitle,
                    description: item.description,
                    deadlineDate: item.deadlineDate
                    
                }));
                setProjects(formattedProjects);
            }
        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    };

    const handleCreateProject = async () => {
        setModalOpen(false);
        setDimmed(false);
        if (!createData.projectTitle || !createData.deadlineDate || !createData.description || !createData.teamId) {
            alert("Please fill in all the required fields.");
            return;
        }
        try {
            const instructorId = getUserIdFromCookie();
            const { data } = await axios.post("http://localhost:3000/project/createProject", {
                instructorId,
                ...createData,
            });
            console.log("Data->",data);
            // Add the new project to the Projects state
            setProjects((prevProjects) => [...prevProjects, data.response]);
            
            // Reset input fields
            setCreateData({
                instructorId: getUserIdFromCookie(),
                projectTitle: '',
                description: '',
                teamId: '',
                deadlineDate: ''
            });
        } catch (error) {
            console.error("Error creating Project:", error);
        }
    };

    const getAllTeams = async () => {
        try {
            const userId = getUserIdFromCookie();
            const { data } = await axios.get("http://localhost:3000/team/getAllTeams",{
                params: {
                    instructorId: userId,
                },
            })
            console.log("team",data);
            if (data.response) {
                setTeams(data.response);
            }
        } catch (error) {
            console.error("Error fetching Teams:", error);
        }
    };
    

    useEffect(() => {
        void getAllProjects();
        void getAllTeams(); 
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProject = Projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

return (
    <>
        <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
            {/* Create Project Modal */}
            {isModalOpen && (
                <div className="modal-container  flex items-center  justify-center z-100">
                    {/* ... (your existing modal code) */}
                    <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-indigo-100 opacity-100 text-purple-700">
                        <h2 className="text-xl font-semibold leading tracking">Add Project</h2>
                        <div className="mt-4">
                            {/* ... (your existing modal form fields) */}
                            {/* For example: */}
                            <label htmlFor="InstructorID">Instructor ID</label><br />
                            <input
                                type="text"
                                value={getUserIdFromCookie()}
                                readOnly
                                placeholder="Instructor ID"
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            /><br />
                            <label htmlFor="ProjectTitle">Project Title</label><br />
                            <input
                                type="text"
                                name="projectTitle"
                                value={createData.projectTitle}
                                onChange={handleInputChange}
                                placeholder="Project Title"
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            /><br />
                            <label htmlFor="DeadlineDate">Deadline Date</label><br />
                            <input
                                type="date"
                                name="deadlineDate"
                                value={createData.deadlineDate}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            /><br />
                            <label htmlFor="Description">Project Description</label><br />
                            <textarea
                                name="description"
                                value={createData.description}
                                onChange={handleInputChange}
                                placeholder="Project Description"
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            ></textarea><br/>
                            <label htmlFor="TeamId">Team</label><br />
                            <select
                                type="text"
                                name="teamId"
                                value={createData.teamId}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            >
                                <option value="">Select Team</option>
                                {teams.map((team) => (
                                    <option key={team.teamId} value={team.teamId}>
                                        {team.teamTitle}
                                    </option>
                                ))}
                            </select>
                            {/* ... other fields */}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="px-6 py-2 rounded-md shadow-sm bg-gray-200 text-black"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                            <button
                                className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2"
                                onClick={handleCreateProject}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="modal-container  flex items-center justify-center z-100">
                    <div className="absolute  bg-[#efebea] opacity-50" onClick={() => setEditModalOpen(false)}></div>
                    <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-indigo-100 opacity-100 text-black">
                        <h2 className="text-xl font-semibold leading tracking">
                            Edit Projects
                        </h2>
                        <div className="mt-4">
                            {/* Here you can have your edit form fields */}
                            {/* For example: */}
                            <label htmlFor="Project Id">Project Id</label><br />

                            <input
                                type="text"
                                value={editData.projectId || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, projectId: e.target.value }))}
                                placeholder="Project Id"
                                className="border p-2 mb-2"
                                disabled
                            /><br />
                            <label htmlFor="Project Name">Project Title </label><br />
                            <input
                                type="text"
                                value={editData.projectTitle || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, projectTitle: e.target.value }))}
                                placeholder="Project Title"
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            /><br />
                            <label htmlFor="Cohort">Project Description</label><br />

                            <input
                                type="text"
                                value={editData.description || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Project Description"
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            /><br />
                            <label htmlFor="deadline Date">Deadline Date</label><br />

                            <input
                                type="date"
                                value={editData.deadlineDate || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, deadlineDate: e.target.value }))}
                                placeholder="Deadline Date"
                                className="border p-2 mb-2 bg-indigo-50 w-full"
                            />
                            {/* ... other fields */}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleEditAction}>Close</button>
                            <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2" onClick={() => { handleEditAction(); update(editData); }}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                        <div className="modal-container flex items-center justify-center z-100">
                            <div className="absolute bg-black opacity-50" onClick={handleCloseDeleteModal}></div>
                            <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                <h2 className="text-xl font-semibold text-center leading tracking">
                                    Delete Project
                                </h2>
                                <div className="mt-4">
                                    <p className="text-left mb-2">
                                        Are you sure you want to delete the project "{selectedProjectForDelete.projectTitle}"? If there is any associated team, that will be deleted too!
                                    </p>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseDeleteModal}>
                                        Close
                                    </button>
                                    <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white ml-2" onClick={() => { handleCloseModal(); deleteProject(selectedProjectForDelete.projectId); }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
            <div className={`h-full w-full flex ${contentClassName}`}>
                <div className="w-full">
                    <nav className="text-purple-700 w-full p-4  dark:text-purple-700">
                        <ol className="text-purple-700 mt-6 flex h-8 space-x-2 dark:text-purple-700">
                            <li className="text-purple-700 flex items-center">
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Trainees</a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl ">Trainees Projects</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Project List</h2>
                    <div>
                        {/* Add Project button */}
                            <button
                                className="px-6 py-2 rounded-sm shadow-sm bg-purple-700 text-white mb-4 hover:bg-purple-800"
                                onClick={() => {
                                    setCreateData({
                                        projectTitle: '',
                                        description: '',
                                    });
                                    setModalOpen(true);
                                    setDimmed(true);
                                }}
                            >
                                Add Project
                            </button>
                            </div>
                        <div className="overflow-x-auto w-full bg-white ">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-purple-700 text-white">
                                    <tr className="text-left">
                                        <th className="p-3 border border-gray-300">Project Id</th>
                                        <th className="p-3 border border-gray-300">Project Name</th>
                                        <th className="p-3 border border-gray-300">Project Deadline</th>
                                        <th className="p-3 border border-gray-300">Project Description</th>
                                        <th className="p-3 border border-gray-300">Project Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProject.map((Projects, index) => (
                                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.projectId}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.projectTitle}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.deadlineDate}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.description}
                                                </p>
                                            </td>

                                            <td className="p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <span className="px-5 py-2 text-white rounded-md bg-purple-700 cursor-pointer hover:bg-purple-900" onClick={() => handleEditClick(Projects)}>
                                                    <span>Edit</span>
                                                </span>
                                                <span className="px-3 py-2 ms-2 text-white rounded-md bg-red-500 cursor-pointer hover:bg-red-600 hover:shadow-md hover-effect" onClick={() => handleDeleteClick(Projects)}>
                                                            <span>Delete</span>
                                                        </span>
                                                </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className="flex justify-center space-x-4 my-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="mr-2 px-3 py-1 bg-purple-700 text-white rounded disabled:bg-purple-300"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastProject >= Projects.length}
                            className="px-3 py-1 bg-purple-700 text-white rounded disabled:bg-purple-300"
                        >
                            Next
                        </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
);
}

export default Projects
