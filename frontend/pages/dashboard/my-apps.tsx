import type { NextPage } from "next";
import Sidebar from "../../components/user-sidebar";

const MyApps: NextPage = () => {
  return (
    <div className="bg-black text-white min-h-screen ">
      <Sidebar />
    </div>
  );
};

export default MyApps;
