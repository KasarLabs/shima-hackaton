import type { NextPage } from "next";
import Sidebar from "../../components/user-sidebar";
import Create from "../../components/create_project";
const CreateProject: NextPage = () => {
  return (
    <div className="bg-black text-white min-h-screen ">
      <Sidebar />
      <Create />
    </div>
  );
};

export default CreateProject;
