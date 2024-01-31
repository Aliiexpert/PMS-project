import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UsersIcon } from '@heroicons/react/24/outline';
import Cookie from 'universal-cookie';

const TeamNum = () => {
  const cookie = new Cookie();
  const [totalTeams, setTotalTeams] = useState(0);

  const getUserIdFromCookie = () => {
    const authCookie = cookie.get('auth');
    if (authCookie && authCookie.userId) {
      return authCookie.userId;
    }
    return null;
  };

  const getTotalTeams = async () => {
    try {
      const userId = getUserIdFromCookie();

      if (!userId) {
        console.error('User ID not found in the cookie');
        return;
      }

      const { data } = await axios.get('http://localhost:3000/team/getTotalTeam', {
        params: {
          instructorId: userId,
        },
      });

      if (data.response) {
        setTotalTeams(data.response);
      }
    } catch (error) {
      console.error('Error fetching total teams:', error);
    }
  };

  useEffect(() => {
    void getTotalTeams();
  }, []);

  return (
    <>
      <div className="w-full lg:w-1/5 p-4 mx-auto my-6 bg-indigo-200 rounded-lg shadow-md">
        <div className="text-center">
          <div className='flex'>
            <UsersIcon className='text-purple-700' style={{ width: '40px', height: '40px' }} />
            <h2 className="text-3xl font-semibold text-purple-500 mb-4">Teams List</h2>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-medium text-gray-800">Total Teams: {totalTeams}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamNum;
