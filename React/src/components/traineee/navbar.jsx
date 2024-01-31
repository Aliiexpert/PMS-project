import { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookie from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";


const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Trainees', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Tasks', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

export default function Navbar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const cookie = new Cookie();
  const  navigate=useNavigate()
  const [Profiles, setProfiles] = useState([]);

  const getUserIdFromCookie = () => {
    const authCookie = cookie.get('auth');
    if (authCookie && authCookie.userId) {
      return authCookie.userId;
    }
    return null;
  };

  const getAllProfiles = async () => {
    try {
      const userId = getUserIdFromCookie();

      const { data } = await axios.get("http://localhost:3000/user/getUserByUserId", {
        params: {
          userId: userId,
        }
      });

      console.log("getAllProfiles", data);

      if (data.response) {
        setProfiles(data.response);
      }
    } catch (error) {
      console.error("Error fetching Profiles:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const instructorId = getUserIdFromCookie(); // Fix the typo here
      // Call the backend logout API
      await axios.post('http://localhost:3000/auth/logout', {
        instructorId: instructorId, // Use the correct variable name
        // Add any other necessary data for the logout
      });
  
      // Delete cookies on the frontend
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
      // Redirect to the desired page after logout
      navigate("/"); // Assuming navigate is imported from your router library
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle errors if needed
    }
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <Disclosure as="nav" className="bg-[#efebea]">
      {/* {({ open }) => ( */}
        <>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >

                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button type="button" className="-m-2.5 p-2.5 rounded-lg border border-purple-500 bg-purple-700 bg-opacity-50" onClick={() => setSidebarOpen(false)}>
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#efebea] px-6 pb-4 ring-1 ring-white/10">
                      <div className="flex h-16 shrink-0 items-center">
                        {/* <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        /> */}
                        <p className="text-purple-700 px-12 text-2xl font-bold">Tech Project</p>
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={() => {
                  if (item.name === 'Dashboard') {
                    void props.updateState("HOME");
                  } else if (item.name === 'Trainees') {
                    void props.updateState("TRAINEES");
                  } else if (item.name === 'Projects') {
                    void props.updateState("PROJECTS");
                  } else if (item.name === 'Tasks') {
                    void props.updateState("TASKS");
                  } else if (item.name === 'Teams') {
                    void props.updateState("TEAMS");
                  } else if (item.name === 'Reports') {
                    void props.updateState("REPORTS");
                  }
                }}
                className={classNames(
                  item.current
                    ? 'bg-purple-700 hover:text-white'
                    : 'text-purple-700 hover:text-white hover:bg-purple-700',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </a>
            </li>
          ))}
                            </ul>
                          </li>
                          <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                              {teams.map((team) => (
                                <li key={team.name}>
                                  <a
                                    href={team.href}
                                    className={classNames(
                                      team.current
                                        ? 'bg-purple-700 text-white'
                                        : 'text-purple-700 hover:text-white hover:bg-purple-700',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                  >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-purple-700 text-white font-medium group-hover:text-white">
                                      {team.initial}
                                    </span>
                                    <span className="truncate">{team.name}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                          <li className="mt-auto">
                            <a
                              href="#"
                              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-purple-700 hover:bg-purple-700 hover:text-white"
                            >
                              <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                              Settings
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <button type="button" className="-m-2.5 p-2.5  lg:hidden bg-purple-700" onClick={() => setSidebarOpen(true)}>
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center lg:hidden">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-purple-700 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-purple-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={Profiles.profilePicture}
                        alt="Profile Pic"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={() => {
                            void props.updateState("PROFILE");
                          }}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                          href="#"
                          onClick={handleLogout}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

         
        </>
      {/* )} */}
    </Disclosure>
  )
}
Navbar.propTypes = {
  updateState: PropTypes.func, 
};