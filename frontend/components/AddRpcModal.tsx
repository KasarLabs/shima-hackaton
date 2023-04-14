import React, { useState } from "react";

interface AddRpcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRpcModal: React.FC<AddRpcModalProps> = ({ isOpen, onClose }) => {
  const [rpcUrl, setRpcUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle RPC URL submission logic here
    console.log("New RPC URL:", rpcUrl);
    setRpcUrl("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold">Add a new RPC URL</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rpc-url" className="block">
              RPC URL
            </label>
            <input
              type="text"
              id="rpc-url"
              value={rpcUrl}
              onChange={(e) => setRpcUrl(e.target.value)}
              className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the RPC URL"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add RPC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRpcModal;
