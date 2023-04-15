import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardItem from "./dashboard_item";
import { generateRandomKeyHex } from "../utils/utils";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  console.log("itemsList", users);
  const itemsList = [
    {
      name: "NFT marketplace",
      network: "polygon",
      type: "https://shima-project/polygon/",
      key: generateRandomKeyHex(100000, 999999),
    },
    {
      name: "Shima Zarboq",
      network: "ethereum",
      type: "https://shima-project/ethereum/",
      key: generateRandomKeyHex(100000, 999999),
    },
    {
      name: "Node taiko",
      network: "taiko",
      type: "https://shima-project/taiko/",
      key: generateRandomKeyHex(100000, 999999),
    },
  ];
  return (
    <div className="p-4 sm:ml-64">
      <h1 className="p-4 font-heading text-3xl">My apps</h1>
      <div className="p-4 ">
        <div className="relative overflow-x-auto shadow-md  bg-black">
          <table className="w-full text-sm text-left text-white font-body">
            <thead className="text-xs  bg-gray-500 uppercase font-heading">
              <tr>
                <th scope="col" className="px-6 py-3">
                  App name
                </th>
                <th scope="col" className="px-6 py-3">
                  Network
                </th>
                <th scope="col" className="px-6 py-3">
                  Url
                </th>
                <th scope="col" className="px-6 py-3">
                  Key
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsList.map((item, index) => (
                <DashboardItem key={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h1 className="p-4 font-heading text-3xl mt-12">My credit</h1>
      <div className="p-4 flex flex-row items-center">
        <div className="flex flex-col">
          <div className="flex flex-row align-center">
            <div className="font-body text-xl">Balance:</div>
            <div className="font-body font-semibold text-2xl ml-2">26 USDC</div>
          </div>
          <div className="flex flex-row align-center">
            <div className="font-body text-xl">Pending payments:</div>
            <div className="font-body font-semibold text-2xl ml-2">15 USDC</div>
          </div>
        </div>

        <div className="flex justify-center mx-auto">
          <button
            className="p-4 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-red-800 to-red-500 hover:text-black"
            disabled
          >
            <span className="text-xl">Credit my account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
