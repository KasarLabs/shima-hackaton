import * as React from "react";
import DashboardItem from "./dashboard_item";

export default function Dashboard() {
  const getItems = () => {};

  const itemsList = [
    {
      name: 'Apple MacBook Pro 17"',
      color: "Slver",
      type: "Laptop",
      price: "$2999",
    },
    {
      name: 'Apple MacBook Pro 17"',
      color: "Slver",
      type: "Laptop",
      price: "$2999",
    },
    {
      name: 'Apple MacBook Pro 17"',
      color: "Slver",
      type: "Laptop",
      price: "$2999",
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
                  <span className="sr-only">Edit</span>
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
    </div>
  );
}
