import type { NextPage } from "next";
import ProviderDashboard from "../../components/provider";
import ProviderSidebar from "../../components/provider-sidebar";

const Provider: NextPage = () => {
  return (
    <div className="bg-black text-white min-h-screen ">
      <div className="p-4">
        <ProviderSidebar />
        <ProviderDashboard />
      </div>
    </div>
  );
};

export default Provider;
