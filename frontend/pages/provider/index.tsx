import type { NextPage } from "next";
import React, { useState, useEffect } from "react";

import ProviderDashboard from "../../components/provider";
import ProviderSidebar from "../../components/provider-sidebar";
import AddRpcModal from "../../components/AddRpcModal";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import type { Provider, Node } from "../../interfaces/";

const Provider: NextPage = () => {
  const [nodes, setNodes] = useState<Provider[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/providers");
        setNodes(response.data);
        console.log("nodes ", response.data);
      } catch (error) {
        console.error("Error fetching nodes", error);
        // Handle error display or notifications here
      }
    };

    fetchNodes();
  }, [nodes]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const exampleNodes: Node[] = [
    { id: 1, network: "Polygon" },
    { id: 2, network: "Taiko" },
    { id: 3, network: "Celo" },
    { id: 4, network: "Gnosis" },
  ];

  return (
    <div className="bg-black text-white min-h-screen ">
      <div className="p-4">
        <ProviderSidebar onOpenModal={handleOpenModal} nodes={exampleNodes} />
        <>
          {isMounted &&
            (address ? (
              <div>
                <AddRpcModal isOpen={isModalOpen} onClose={handleCloseModal} />
                <ProviderDashboard nodes={nodes} />
              </div>
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
        </>
      </div>
    </div>
  );
};

export default Provider;
