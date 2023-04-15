import type { NextPage } from "next";
import React, { useState } from "react";

import ProviderDashboard from "../../components/provider";
import ProviderSidebar from "../../components/provider-sidebar";
import AddRpcModal from "../../components/AddRpcModal";

import type { Node } from "../../interfaces/";

const Provider: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const nodes: Node[] = [
    { id: 1, network: "Polygon" },
    { id: 2, network: "Taiko" },
    { id: 3, network: "Celo" },

    // Add more nodes here or fetch them from an API
  ];
  return (
    <div className="bg-black text-white min-h-screen ">
      <div className="p-4">
        <ProviderSidebar onOpenModal={handleOpenModal} nodes={nodes} />
        <AddRpcModal isOpen={isModalOpen} onClose={handleCloseModal} />

        <ProviderDashboard nodes={nodes} />
      </div>
    </div>
  );
};

export default Provider;
