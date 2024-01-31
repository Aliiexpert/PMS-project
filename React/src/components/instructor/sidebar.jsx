import PropTypes from "prop-types";



import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Profile', href: '#', icon: UserIcon, current: false },
  { name: 'Teams', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Trainees', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Tasks', href: '#', icon: CalendarIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
  { name: 'Request', href: '#', icon: ChartPieIcon, current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Sidebar(props) {
  return (
    
      // Static sidebar for desktop
      <div className=" lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-1/5.1 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex pl-5 flex-col gap-y-5  bg-[#efebea]  w-full h-full">
            <div className="flex pt-4 shrink-0 items-center">
              
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
                            void props.updateState(item.name.toUpperCase());
                          }}
                        className={classNames(
                            item.current
                              ? 'bg-purple-800 text-white hover:text-white'
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
  
  );
}

export default Sidebar;

Sidebar.propTypes = {
  updateState: PropTypes.func, 
};