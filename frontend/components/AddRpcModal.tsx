import React, { useState } from "react";
import { networks, Network } from "../utils/utils";
import axios from "axios";
import type { Provider } from "../interfaces";
import { generateRandomKey } from "../utils/utils";

interface AddRpcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getChainIdFromName(name: string): string {
  const network = networks.find((network) => network.name === name);
  return network?.chainId || "";
}

const AddRpcModal: React.FC<AddRpcModalProps> = ({ isOpen, onClose }) => {
  const [rpcUrl, setRpcUrl] = useState("");
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData: Provider = {
      id: generateRandomKey(1, 1000000),
      rpc_url: rpcUrl,
      chain_id: getChainIdFromName(network),
      performance_score: 0,
      computation_units: 0,
    };
    // Process form submission logic here
    try {
      const response = await axios.post(
        "http://localhost:3001/providers",
        postData
      );

      console.log("RPC added successfully", response);

      // Close the modal and reset the form state
      onClose();
      setStep(1);
      setNetwork("");
      setRpcUrl("");
    } catch (error) {
      console.error("Error adding RPC", error);
      // Handle error display or notifications here
    }
  };

  const handleNetworkChange = (e: any) => {
    setNetwork(e.target.value);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg relative">
        <h2 className="text-2xl font-semibold text-black border-b pb-2">
          Add a new RPC
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="text-black">
              <label htmlFor="network" className="block">
                Please chose a network
              </label>
              <select
                id="network"
                value={network}
                onChange={handleNetworkChange}
                className="w-full p-2 mt-2 border rounded-lg  text-black focus:outline-none focus:ring-2 focus:ring-red-800"
              >
                <option value="">Select a network</option>
                {networks.map((net: Network, index) => (
                  <option key={index} value={net.name}>
                    {net.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {step === 2 && (
            <div className="text-black">
              <label htmlFor="rpc-url" className="block">
                RPC URL
              </label>
              <input
                type="text"
                id="rpc-url"
                value={rpcUrl}
                onChange={(e) => setRpcUrl(e.target.value)}
                className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter the RPC URL"
              />
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <div
              className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:cursor-pointer"
              onClick={onClose}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="h-8 w-8"
              >
                <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              </svg>
            </div>
            {step === 1 && (
              <button
                type="button"
                className="px-4 py-2 mt-4 text-white bg-red-800 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-800"
                onClick={nextStep}
                disabled={!network}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                className="px-4 py-2 mt-4 text-white bg-red-800 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-800"
                onClick={handleSubmit}
              >
                Add RPC
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRpcModal;
