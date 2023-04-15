import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import Sidebar from "../../components/user-sidebar";
import Create from "../../components/create_project";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CreateProject: NextPage = () => {
  const { address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen ">
      <Sidebar />
      {isMounted &&
        (address ? (
          <Create />
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
        ))}
    </div>
  );
};

export default CreateProject;
