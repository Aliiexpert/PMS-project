import TraineeNum from "./Trainee-management/traineeNum";
import ProjectNum from "./Project-management/projectNum";
import ProjectDeadline from "./Project-management/projectDeadline";
import TeamNum from "./Team-management/teamNum";

function Dashboard() {
  return (
    <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
      <h1 className=" text-4xl font-bold text-center text-indigo-700 tracking-tight leading-10 mb-4">
        Instructor Dashboard
      </h1>
      <div className="flex">
      <TraineeNum/>
      <ProjectNum/>
      <TeamNum/>

      </div>
      <div>
        <ProjectDeadline/>
      </div>
    </div>
  );
}

export default Dashboard;
