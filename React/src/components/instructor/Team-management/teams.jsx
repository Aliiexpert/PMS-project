  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
  import Cookie from "universal-cookie";
  import Select from 'react-select';

  const Teams = () => {
    const cookie = new Cookie();

    const [isAddMode, setAddMode] = useState(false);
    const [newTeamData, setNewTeamData] = useState({
      teamsLeaderId: "",  
      // teamsLeaderId: "",
      title: "",
    });
    const handleCloseTeamModal = () => {
      setAddModalOpen(false);

      setDimmed(false);
  };
  const [teamLeader, setTeamLeader] = useState(null);

  const handleTeamLeaderSelect = (selectedOption) => {
    setTeamLeader(selectedOption ? selectedOption.value : null);
};
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [memberOptions, setMemberOptions] = useState([]);
    const [localSelectedTeamMembers, setLocalSelectedTeamMembers] = useState([]);
    const [selectedUsers,setSelectedUsers]= useState("")

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);

    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [teamMembers, setTeamMembers] = useState([]);
    const [projects, setProjects] = useState([]);

    const [createTeamCounter, setCreateTeamCounter] = useState(0);


    const handleViewClick = async (teamId) => {
      try {
  // Set loading to true when initiating the API call
          setIsLoadingView(true);
          setDimmed(true)

  // Call the getMembers API
  const response = await axios.get("http://localhost:3000/team/getTeamMembers", {
      params: {
          teamId: teamId
      }
  });
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Once the data is loaded or operation is complete, open the modal
          setIsLoadingView(false);
  // Update the state with the fetched data
  setViewData(response.data.response);

  // Set loading to false once the data is fetched

  // Open the view modal
  setViewModalOpen(true);
  setDimmed(true);
} catch (error) {
  console.error("Error fetching team members:", error);
  // Handle the error and set loading to false
  setViewLoading(false);
}
};

    const getUserIdFromCookie = () => {
      const authCookie = cookie.get('auth');
      if (authCookie && authCookie.userId) {
        return authCookie.userId;
      }
      return null;
    };
    const instructorId = getUserIdFromCookie();

    const getAllTeamsMember = async () => {
      const instructorId = getUserIdFromCookie();
      try {
        const { data } = await axios.get("http://localhost:3000/team/getAllMembers",{
          params:{
            instructorId: instructorId
          }
        });
        console.log("members",data)
          setTeamMembers(data.response);

          setMemberOptions(data.response.map(user => ({
            value: user.userId,
            label: `${user.firstName} ${user.lastName}`
        })

        ));
        const filteredMembers = data.response.filter(user => !selectedUsers.includes(user.userId));
        setTeamMembers(filteredMembers);

        const filteredOptions = filteredMembers.map(user => ({
            value: user.userId,
            label: `${user.firstName} ${user.lastName}`
        }));
        setMemberOptions(filteredOptions);
      } catch (error) {
        console.error("Error fetching Team Members:", error);
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
        console.log("project=>",data);
        if (data.response) {
          setProjects(data.response);
        }
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };

    const handleAddTeam = async () => {
      try {
        const response = await axios.post("http://localhost:3000/team/createTeam", newTeamData);
        console.log(response.data);
        getAllTeams(currentPage);
        setAddModalOpen(false);
        setDimmed(false);
        
      } catch (error) {
        console.error("Error creating Team:", error);
      }
    };
    const handleAddsClick = (project) => {
      setCurrentproject(project);
      setAddData({}); // Clear previous data
      setLocalSelectedTeamMembers([]); // Reset local state
      setAddModalOpen(true);
      setDimmed(true);
  };
    const handleAddClick = () => {
      setAddMode(true);
      setLocalSelectedTeamMembers([]); // Reset local state

      setNewTeamData({
        instructorId: getUserIdFromCookie(),
        teamsLeaderId: "",
        title: "",
      });
      setAddModalOpen(true);
      setDimmed(true);
    };


    const handleCloseModal = () => {
      setAddModalOpen(false); // Close the isAddModalOpen modal
      setEditModalOpen(false); // Close the isEditModalOpen modal
      setModalOpen(false);
      setDimmed(false);
    };

    const [currentTeam, setCurrentTeam] = useState(null);
    const handleEditClick = (team) => {
      setCurrentTeam(team);
      setEditData(team);
      setEditModalOpen(true);
      setDimmed(true);
    };


    const handleEditAction = () => {
      setEditModalOpen(false);
      setDimmed(false);
    };

    const contentClassName = isDimmed ? 'dimmed' : '';

    const [teams, setTeams] = useState([]);

    const update = async (updatedData) => {
      try {
        const { data } = await axios.put("http://localhost:3000/team/updateTeam", updatedData);
        console.log(data);

        setTeams((prevTeams) => {
          const updatedIndex = prevTeams.findIndex((team) => team.teamsId === updatedData.teamsId);
          if (updatedIndex !== -1) {
            const updatedTeams = [...prevTeams];
            updatedTeams[updatedIndex] = updatedData;
            return updatedTeams;
          }
          return prevTeams;
        });
      } catch (error) {
        console.error("Error updating Team:", error);
      }
    };


    const getAllTeams = async () => {
      try {
        setCurrentPage();
        const userId = getUserIdFromCookie();
    
        if (!userId) {
          console.error('User ID not found in the cookie');
          return;
        }
    
        const { data: teamsData } = await axios.get("http://localhost:3000/team/getAllTeams", {
          params: {
            instructorId: userId,
          },
        });
    
        if (teamsData.response) {
          const userId = getUserIdFromCookie();
          const { data: projectsData } = await axios.get("http://localhost:3000/project/getAllProjects", {
            params: {
              instructorId: userId,
            },
          });
    
          const projectsMap = new Map(projectsData.response.map(project => [project.teamId, project.projectTitle]));
      
          const formattedTeams = teamsData.response.map(item => ({
            teamsId: item.teamId,
            teamTitle: item.teamTitle,
            teamsLeaderId: item.leaderName,
            projectTitle: projectsMap.get(item.teamId) || 'N/A',
          }));
    
          setTeams(formattedTeams);
        }
      } catch (error) {
        console.error("Error fetching Teams:", error);
      }
    };
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const handleMemberSelect = (selectedOption, index) => {
      setLocalSelectedTeamMembers(prev => {
          const newSelectedMembers = [...prev];
          newSelectedMembers[index] = selectedOption ? selectedOption.value : null;
          return newSelectedMembers;
      });

      setSelectedTeamMembers(prev => {
          const newSelectedMembers = [...prev];
          newSelectedMembers[index] = selectedOption ? selectedOption.value : null;
          return newSelectedMembers;
      });
  };
    const create = async () => {
      try {
          const requestData = {
               title: newTeamData.title,
              userId: selectedTeamMembers.filter(member => member !== null),
              teamsLeaderId: teamLeader,
              instructorId: instructorId
          };

          const data  = await axios.post("http://localhost:3000/team/createTeam", requestData);
          console.log(data);
          console.log(data.response);

          // Increment the counter
          setCreateTeamCounter(prevCounter => prevCounter + 1);

          // Add the new team to the state
          getAllTeams();
          getAllTeamsMember();
      } catch (error) {
          console.error("Error creating Team:", error);
      }
  };
    const handleBlockClick = (team) => {
      setSelectedTeamId(team.teamsId);
      setModalOpen(true);
      setDimmed(true);
    };

    const teamsPerPage = 5;

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const handleAddAction = () => {
      // Check if all team members are selected
      const isAllMembersSelected = localSelectedTeamMembers.every(member => member !== null);

      if (!isAllMembersSelected || teamLeader === null ) {
          // Show an error message or handle incomplete selection
          console.error("Please select all team members, team leader, and project");
          return;
      }

      // Use a Set to filter out duplicate users
      const uniqueSelectedMembers = [...new Set(localSelectedTeamMembers)];

      // Continue with the add action
      create({
          userId: uniqueSelectedMembers,
          leaderId: teamLeader,
          instructorId: instructorId
      });

      setAddModalOpen(false);
      setDimmed(false);
  };



    useEffect(() => {
      // Fetch team data
      void getAllTeams();
    
      // Fetch team members data
      void getAllTeamsMember();
    
      // Fetch project data
      void getAllProjects();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts
    

    return (
      <>
        <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
        {isAddModalOpen && (
             <div className="modal-container  flex items-center justify-center z-100">
             <div className="absolute  bg-black opacity-50" onClick={() => setAddModalOpen(false)}></div>
             <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                 <h2 className="text-xl font-semibold text-center leading tracking">
                     Add Team
                 </h2>
                 <div className="mt-4">
                     {/* Here you can have your edit form fields */}
                     {/* For example: */}
                     <label htmlFor="instructorId">Instructor Id</label><br />
              <input
                type="text"
                value={instructorId}
                disabled
                className="border p-2 mb-2 w-full"
              /><br />
              <label htmlFor="title">Title</label><br />
              <input
                type="text"
                value={newTeamData.title}
                onChange={(e) => setNewTeamData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Title"
                className="border p-2 mb-2 w-full bg-white"
              />
                     {[...Array(4)].map((_, index) => (
                              <div key={index}>
                             <label htmlFor={`teammember-${index}`}>{`${index + 1}st Team Member`}</label><br />

                             <Select
                                 id={`teammember-${index}`}
                                 className="bg-white rounded-lg mb-2 focus:outline-none text-black font-medium"
                                 isSearchable={true}
                                 isDisabled={false}
                                 placeholder={`Select ${index + 1}st team member`}
                                 options={memberOptions.filter(option => !localSelectedTeamMembers.includes(option.value))}
                                 onChange={(selectedOption) => handleMemberSelect(selectedOption, index)}
                             />




                      </div>
                     ))} <label htmlFor="teammember">Select team Leader</label><br />

                     <Select
                         className="bg-white rounded-lg mb-2 focus:outline-none text-black font-medium"
                         isSearchable={true}
                         isDisabled={false}
                         placeholder="Select team leader"
                         options={memberOptions.filter(option => localSelectedTeamMembers.includes(option.value))}
                         onChange={(selectedOption) => handleTeamLeaderSelect(selectedOption)}
                     />
                   



                     {/* ... other fields */}
                 </div>
                 <div className="flex justify-end mt-6">
                     <button className="px-6 py-2 rounded-sm  hover:bg-gray-300 hover:shadow-sm hover-effect shadow-sm bg-gray-200 text-black" onClick={handleCloseTeamModal}>Close</button>
                     <button
                         className="px-6 py-2  hover:bg-indigo-600 hover:shadow-md hover-effect rounded-sm shadow-sm bg-indigo-500 text-white ml-2"
                         onClick={() => {
                             console.log("Selected Team Members:", selectedTeamMembers.filter(member => member !== null));
                             console.log("Team Leader ID:", teamLeader);
                             handleAddAction();
                         }}
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
              <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                <h2 className="text-xl font-semibold leading tracking">Edit Team</h2>
                <div className="mt-4">
                  {/* Here you can have your edit form fields */}
                  {/* For example: */}
                  <label htmlFor="Team Id">Team Id</label><br />
                  <input
                                  type="text"
                                  value={editData.teamsId || ''}
                                  onChange={(e) => setEditData(prev => ({ ...prev, teamsId1: e.target.value }))}
                                  placeholder="Teams "
                                  className="border p-2 mb-2"
                                  disabled
                              /><br />
                  <label htmlFor="Team Leader">Team Leader</label><br />

                  <input
                    type="text"
                    value={editData.teamsLeaderId || ''} 
                    onChange={(e) => setEditData((prev) => ({ ...prev, teamsLeaderId: e.target.value }))}
                    placeholder="Team Leader"
                    className="border p-2 mb-2"
                  /><br />
                  <label htmlFor="Title">Title</label><br />
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Title"
                    className="border p-2 mb-2"
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
          
          {isModalOpen && (
            <div className="modal-container flex items-center justify-center z-100">
              <div className="absolute  bg-[#efebea] opacity-50" onClick={handleCloseModal}></div>
              <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                <h2 className="flex items-center gap-2 text-xl font-semibold leadi tracki">
                  <span className=''>Are you sure you want to block this user?</span>
                </h2>
                <p className="flex-1 dark:text-gray-400">By blocking this user, they will no longer be able to interact with you or view your content.</p>
                <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                  {teams.map((team, index) => (
                    <div key={index}>
                      {selectedTeamId === team.teamsId ? (
                        <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>
                      ) : null}
                      {selectedTeamId === team.teamsId ? (
                        <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); /*blockUser(team.teamsId)*/ }}>Block</button>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className={`h-full w-full flex ${contentClassName}`}>
            <div className="w-full">
              <nav className="text-purple-700 w-full p-4  dark:text-purple-700">
                <ol className="text-purple-700 mt-6 flex h-8 space-x-2 dark:text-purple-700">
                  <li className="text-purple-700 flex items-center">
                    <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-purple-700 text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="dark:text-gray-400">/</span>
                    <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Teams</a>
                  </li>
                </ol>
                <h3 className="font-bold text-3xl ">Teams</h3>
              </nav>
              <div className="container p-2 mx-auto sm:p-4 text-black ">
                  <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Team List</h2>
                  <div className='pb-4'>
                  <button
                      className="justify-end rounded-sm shadow-sm bg-purple-700 text-white"
                      onClick={handleAddClick}
                    >
                      Add Team
                    </button>
                  </div>
                <div className="overflow-x-auto w-full bg-white ">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-purple-700 text-white">
                      <tr className="text-left">
                        <th className="p-3 border border-gray-300">Team Id</th>
                        <th className="p-3 border border-gray-300">Team Title</th>
                        <th className="p-3 border border-gray-300">Team Leader</th>
                        <th className="p-3 border border-gray-300">Project Title</th>
                        <th className="p-3 border border-gray-300">Team Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team, index) => (
                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                          <td className="p-3 border border-gray-300">
                            <p>{team.teamsId}</p>
                          </td>
                          <td className="p-3 border border-gray-300">
                            <p>{team.teamTitle}</p>
                          </td>
                          <td className="p-3 border border-gray-300">
                            <p>{team.teamsLeaderId}</p>
                          </td>
                          <td className="p-3 border border-gray-300">
                            <p>{team.projectTitle}</p>
                          </td>
                          <td className="p-3 border space-x-2 border-gray-300">
                            <span className="px-3  py-2 text-white rounded-md bg-purple-700 cursor-pointer" onClick={() => handleEditClick(team)}>
                              <span>Edit</span>
                            </span>
                            <span
                              className="px-3 py-2 text-white rounded-md bg-red-500 cursor-pointer"
                              onClick={() => handleBlockClick(team)}
                            >
                              <span>Block</span>
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
                    className="mr-2 px-3 py-1 bg-purple-700 text-white rounded"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastTeam >= teams.length}
                    className="px-3 py-1 bg-purple-700 text-white rounded"
                  >
                    <FaArrowRight />
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

  export default Teams;
