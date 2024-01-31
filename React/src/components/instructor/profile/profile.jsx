import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "universal-cookie";




const Profile = () => {
    const cookie = new Cookie();


    const [currentProfile, setCurrentProfile] = useState(null);
    const handleEditClick = (Profile) => {
        setCurrentProfile(Profile);
        setEditData(Profile);
        setEditModalOpen(true);
        setDimmed(true); 
    };

    

    const getUserIdFromCookie = () => {
        const authCookie = cookie.get('auth');
        if (authCookie && authCookie.userId) {
          return authCookie.userId;
        }
        return null;
      };



    const [Profiles, setProfiles] = useState([]);

    const update = async (updatedData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/user/updateUser", updatedData);
            console.log(data); 

            // Update the Profiles state with the updated data
            setProfiles(prevProfiles => {
                const updatedIndex = prevProfiles.findIndex(Profile => Profile.email === updatedData.email);
                if (updatedIndex !== -1) {
                    const updatedProfiles = [...prevProfiles];
                    updatedProfiles[updatedIndex] = updatedData;
                    return updatedProfiles;
                }
                return prevProfiles;
            });

        } catch (error) {
            console.error("Error updating Profile:", error);
        }
    }
 
   const getAllProfiles = async () => {
        try {
            const userId = getUserIdFromCookie();

            const { data } = await axios.get("http://localhost:3000/user/getUserByUserId",{
                params: {
                    userId: userId,
                }
            });

            
            if (data.response) {
                setProfiles(data.response);
            }
        } catch (error) {
            console.error("Error fetching Profiles:", error);
        }
    };
    const blockUser = async (Profile) => {
        try {
           const {data}= await axios.post("http://localhost:3000/user/blockUser", { userId: Profile });
            console.log(data.response)
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };


    const handleBlockClick = (Profile) => {
        setSelectedProfileId(Profile.userId);
        setModalOpen(true);
        setDimmed(true);
    };
    
    useEffect(() => {
        
        void getAllProfiles();
    }, []);


  return (
    <>
        <div className="w-full h-full text-indigo-700 p-4 pt-12 bg-opacity-50 bg-indigo-200">
            
                    <nav className="text-purple-700 w-full  dark:text-purple-700">
                        <ol className="text-purple-700 mt-6 flex h-8 space-x-2 dark:text-purple-700">
                            <li className="text-purple-700 flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-purple-700 text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Profiles</a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl ">Profiles</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <div className="overflow-x-auto w-full  ">
                            <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                            <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Full name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <p>{Profiles.firstName + ' ' + Profiles.lastName}</p>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        User Id
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <p>{Profiles.userId}</p>
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Email address
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <p>{Profiles.email}</p>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Role
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <p>{Profiles.role}</p>
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        About
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" style={{ textAlign: 'left', textJustify: 'inter-word' }}>
                                        Instructors play a crucial role in guiding aspiring developers through the intricacies of web development. Specializing in React, they emphasize component-based architecture and declarative syntax to enable the creation of dynamic and responsive web applications. Through hands-on exercises, they empower learners to navigate real-world challenges. Overall, React instructors not only impart technical skills but also foster a creative mindset essential for success in the dynamic field of web development.
                                    </dd>
                                    </div>
                            </dl>                    
                
                    </div>
                        </div>
                    </div>
                </div>
            

        </div>
    </>
  );
}

export default Profile