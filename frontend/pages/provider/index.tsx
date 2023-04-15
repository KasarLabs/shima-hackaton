import type { NextPage } from "next";
import React, { useState } from "react";

import ProviderDashboard from "../../components/provider";
import ProviderSidebar from "../../components/provider-sidebar";
import AddRpcModal from "../../components/AddRpcModal";

const Provider: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-black text-white min-h-screen ">
      <div className="p-4">
        <ProviderSidebar onOpenModal={handleOpenModal} />
        <AddRpcModal isOpen={isModalOpen} onClose={handleCloseModal} />

        <ProviderDashboard />
      </div>
    </div>
  );
};

export default Provider;
