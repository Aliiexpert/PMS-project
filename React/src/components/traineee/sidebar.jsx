import PropTypes from "prop-types";

import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Teams', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Tasks', href: '#', icon: CalendarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Sidebar(props) {

      return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#eff6ff] px-6 pb-4"> {/* Lighter blue background */}
          <div className="flex h-16 shrink-0 items-center">
            <p className="text-blue-700 px-12 text-2xl font-bold">Tech Project</p> {/* Blue text */}
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
                          void props.updateState(item.name.toUpperCase());
                        }}
                        className={classNames(
                          item.current
                            ? 'bg-blue-700 text-white hover:text-white' // Blue background for current item
                            : 'text-blue-700 hover:text-white hover:bg-blue-700', // Blue text and hover background
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0 text-blue-500" aria-hidden="true" /> {/* Blue icon */}
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-purple-700">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-purple-200 text-white'
                              : 'text-purple-700 hover:text-white hover:bg-purple-700',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-purple-800 text-white font-medium group-hover:text-white">
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
        </div>
     
    </>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  updateState: PropTypes.func, 
};