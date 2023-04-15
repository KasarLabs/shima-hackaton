import React, { useState } from "react";
import NodeItem from "./provider-node-item";
import AddRpcModal from "./AddRpcModal";
import DeleteRpcModal from "./DeleteRpcModal";
import type { Node } from "../interfaces/";

const ProviderDashboard = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [isMinusVisible, setIsMinusVisible] = useState(false);

  const handleMinusButtonClick = () => {
    setIsShaking(!isShaking);
    setIsMinusVisible(!isMinusVisible);
  };

  const nodes: Node[] = [
    { id: 1, network: "Ethereum Mainnet" },
    { id: 2, network: "Ethereum Mainnet" },
    // Add more nodes here or fetch them from an API
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeItemClick = (node: Node) => {
    setSelectedNode(node);
    handleOpenDeleteModal();
  };

  return (
    <div className="ml-64">
      <div className="">
        <h1 className="p-4 font-heading text-6xl text-center">
          Providers provide
        </h1>

        <div className="mt-8">
          <div className="flex flex-row place-content-between">
            <p className="pl-4 font-body mb-4">Monitor your nodes:</p>
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                onClick={handleOpenModal}
              >
                +
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleMinusButtonClick}
              >
                -
              </button>
              <AddRpcModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-white">
            {nodes.map((node) => (
              <div>
                <NodeItem
                  key={node.id}
                  id={node.id}
                  network={node.network}
                  isShaking={isShaking}
                  isMinusVisible={isMinusVisible}
                  onNodeItemClick={() => handleNodeItemClick(node)}
                />
                {selectedNode && selectedNode.id === node.id && (
                  <DeleteRpcModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    node={selectedNode}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t mt-12">
          <div className="flex flex-row place-content-between">
            <p className="font-body p-4">Configure a new node</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
