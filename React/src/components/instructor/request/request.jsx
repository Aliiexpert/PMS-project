import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Cookie from "universal-cookie";


function Request() {
    
    const cookie = new Cookie();
    const [Requests, setRequests] = useState([]);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    const getUserIdFromCookie = () => {
        const authCookie = cookie.get('auth');
        if (authCookie && authCookie.userId) {
          return authCookie.userId;
        }
        return null;
      };
    

    useEffect(() => {

    const getAllRequests = async () => {
        try {
            const userId = getUserIdFromCookie();

            const { data } = await axios.get("http://localhost:3000/user/getAllRequests",{
              params:{
                instructorId: userId

              }  
            });
            setData(data);

            if (data.response) {
                const formattedRequests = data.response.map(item => ({
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    userId: item.userId,
                    cohort: item.cohort,
                    stack: item.stack
                }));
                setRequests(formattedRequests);
            }
          
        } catch (error) {
            setLoading(false);

        }
    };
        getAllRequests();

    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Requests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Requests.length / itemsPerPage);

    const approveRequest = async (userId) => {
        try {
            await axios.put("http://localhost:3000/user/updateUser", {

                userId,
                isApproved: true,
            });
            // If successful, remove the approved request from the frontend
            setRequests(prevRequests => prevRequests.filter(request => request.userId !== userId));
            alert("The request has been approved successfully");
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };

    const handleBlockClick = async (userId) => {
        
        try {
            await axios.put("http://localhost:3000/user/updateUser", {
                userId,
                isBlocked: true,
            });
            // If successful, remove the approved request from the frontend
            setRequests(prevRequests => prevRequests.filter(request => request.userId !== userId));
            alert("The request has been blocked successfully");
        } catch (error) {
            console.error("Error blocking request:", error);
            alert("Failed to block the request. Please try again.");
        }
    };

  return (
    <>
        <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
          
        
            <div className="h-full w-full flex ">
                <div className="w-full">
                    <nav className="text-purple-700 w-full p-4  dark:text-purple-700">
                        <ol className="text-purple-700 mt-6 flex h-8 space-x-2 dark:text-purple-700">
                            <li className="text-purple-700 flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-purple-700 text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Requests</a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl ">Requests</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Request List</h2>
                        {Requests.length === 0 ? (
                                <p className="text-lg font-semibold text-purple-700">No requests to approve</p>
                            ) : (
                        <div className="overflow-x-auto w-full bg-white ">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-yellow-200">
                                    <tr className="text-left">
                                        <th className="p-3 border border-gray-300">Name</th>
                                        <th className="p-3 border border-gray-300">Email</th>
                                        <th className="p-3 border border-gray-300">Cohort</th>
                                        <th className="p-3 border border-gray-300">Stack</th>
                                        <th className="p-3 border border-gray-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Requests.map((Request, index) => (

                                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.firstName + " " + Request.lastName}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.email}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.cohort}
                                                </p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.stack}
                                                </p>
                                            </td>

                                            <td className="p-3 border border-gray-300">

                                                <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer"
                                                onClick={() => approveRequest(Request.userId)}>
                                                    <span>Approve</span>

                                                </span>  <span
                                                    className="px-3 py-2 text-white rounded-md bg-red-500 cursor-pointer"
                                                    onClick={() => handleBlockClick(Request.userId)} // Pass the Request object here
                                                >
                                                    <span>Block</span>
                                                </span>
                                            </td> 
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
        <div className="flex items-center justify-center mt-4 py-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 font-semibold text-white bg-indigo-500 rounded-md"
        >
           Prev
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md"
        >
          Next 
        </button>
      </div>
                        </div>
    )}
                    </div>
                </div>
            </div>

        </div>
    </>
  );
}

export default Request
