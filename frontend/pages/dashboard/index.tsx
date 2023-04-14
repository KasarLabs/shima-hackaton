import type { NextPage } from "next";
import Sidebar from "../../components/user-sidebar";
import Dashboard from "../../components/dashboard";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const User: NextPage = () => {
  const { address } = useAccount();

  return (
    <div className="bg-black text-white min-h-screen ">
      <Sidebar />
      {address ? (
        <Dashboard />
      ) : (
        <div className="ml-64 text-white p-32 flex flex-col justify-center items-center ">
          <div className=" font-heading text-3xl p-4">
            😥 you are not connected
          </div>
          <div className="font-heading text-xl mb-4">
            Please connect your wallet
          </div>
          <div className="">
            <ConnectButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
