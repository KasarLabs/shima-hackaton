import React from "react";
import type { Provider } from "../interfaces/";
interface DeleteRpcModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: Provider;
}

const DeleteRpcModal: React.FC<DeleteRpcModalProps> = ({
  isOpen,
  onClose,
  node,
}) => {
  const handleYes = () => {
    onClose();
  };

  const handleNo = () => {
    onClose();
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg text-black">
        <h1 className="text-xl font-bold text-gray-800 border-b pb-2">{`Delete node ${node.id}`}</h1>
        <h2 className="text-l font-semibold">
          {`Do you really want to delete the RPC for chainId ${node.chain_id} ?`}
        </h2>
        <div className="flex flex-row">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleNo}
          >
            Oops, No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRpcModal;
