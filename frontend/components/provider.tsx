import React, { useState } from "react";
import NodeItem from "./provider-node-item";
import AddRpcModal from "./AddRpcModal";
import DeleteRpcModal from "./DeleteRpcModal";
import type { Provider } from "../interfaces/";
import FakeBalanceChart from "./FakeBalanceChart";
interface ProviderDashboardProps {
  nodes: Provider[];
}

const ProviderDashboard = ({ nodes }: ProviderDashboardProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isMinusVisible, setIsMinusVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Provider | null>(null);

  const handleMinusButtonClick = () => {
    setIsShaking(!isShaking);
    setIsMinusVisible(!isMinusVisible);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleNodeItemClick = (node: Provider) => {
    setSelectedNode(node);
    handleOpenDeleteModal();
  };

  return (
    <div className="ml-64">
      <div className="">
        <h1 className="p-4 mb-12 font-heading text-6xl text-center">
          Providers provide
        </h1>

        <div className="mt-8">
          <div className="flex flex-row place-content-between">
            <p className="pl-4 font-heading text-3xl mb-4">
              Monitor your nodes
            </p>
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
                  node={node}
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
          <h1 className="p-4 font-heading text-3xl mt-12">My credit</h1>
          <div className="p-4 flex flex-row items-center">
            <div className="flex flex-col">
              <div className="flex flex-row align-center">
                <div className="font-body text-xl">Balance:</div>
                <div className="font-body font-semibold text-2xl ml-2">
                  900 USDC
                </div>
              </div>
              <div className="flex flex-row align-center">
                <div className="font-body text-xl">Incoming payments:</div>
                <div className="font-body font-semibold text-2xl ml-2">
                  128 USDC
                </div>
              </div>
            </div>

            <div className="flex justify-center mx-auto">
              <FakeBalanceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
