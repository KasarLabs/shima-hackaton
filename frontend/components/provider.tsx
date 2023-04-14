import React, { useState } from "react";
import AddRpcModal from "./AddRpcModal";

const ProviderDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ml-64">
      <h1 className="p-4 font-heading text-3xl">Providers provide,</h1>
      <p className="pl-4 font-body text-xl">Please add a new RPC</p>
      <button
        className="px-4 py-2 ml-4 font-body text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleOpenModal}
      >
        Add RPC
      </button>
      <AddRpcModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProviderDashboard;
