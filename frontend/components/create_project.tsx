import React, { useState } from "react";
import { chains } from "../utils/utils";

export default function Create() {
  const [selected, setSelected] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [paymentPlan, setPaymentPlan] = useState<boolean>(false);

  const handleSelected = (item: string) => {
    if (!selected || selected != item) {
      setSelected(item);
    } else {
      setSelected("");
    }
  };
  console.log(paymentPlan);
  return (
    <div className="p-4 sm:ml-64">
      <h1 className="p-4 font-heading text-3xl">Create a project</h1>
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="ml-4 px-4">
          <h2 className="font-heading text-lg">Please Select a Network</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4 p-4 ml-4">
          {chains.map((chain, index) => (
            <div
              key={index}
              className={`flex items-center justify-center h-16 rounded border transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer ${
                selected === chain ? "bg-red-800" : ""
              }`}
              onClick={() => handleSelected(chain)}
            >
              <img
                src={`/chains/${chain}.png`}
                alt={`${chain.charAt(0).toUpperCase() + chain.slice(1)} logo`}
                className="w-8 h-8 mr-2" // Adjust the width and height as needed
              />
              <p className="text-2xl text-white">
                {chain.charAt(0).toUpperCase() + chain.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 rounded-lg dark:border-gray-700">
        <div className="ml-4 px-4">
          <h2 className="font-heading text-lg">
            Please enter a name for your project
          </h2>

          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
              >
                <path d="M20.92 2.38A15.72 15.72 0 0017.5 2a8.26 8.26 0 00-6 2.06Q9.89 5.67 8.31 7.27c-1.21-.13-4.08-.2-6 1.74a1 1 0 000 1.41l11.3 11.32a1 1 0 001.41 0c1.95-2 1.89-4.82 1.77-6l3.21-3.2c3.19-3.19 1.74-9.18 1.68-9.43a1 1 0 00-.76-.73zm-2.36 8.75L15 14.67a1 1 0 00-.27.9 6.81 6.81 0 01-.54 3.94L4.52 9.82a6.67 6.67 0 014-.5A1 1 0 009.39 9s1.4-1.45 3.51-3.56A6.61 6.61 0 0117.5 4a14.51 14.51 0 012.33.2c.24 1.43.62 5.04-1.27 6.93z" />
                <path d="M17.73 8.3 A2 2 0 0 1 15.73 10.3 A2 2 0 0 1 13.73 8.3 A2 2 0 0 1 17.73 8.3 z" />
                <path d="M5 16c-2 1-2 5-2 5a7.81 7.81 0 005-2z" />
              </svg>
            </div>
            <input
              type="text"
              id="project-name-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="My awesome project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="px-4 rounded-lg dark:border-gray-700">
        <div className="ml-4 px-4 py-4">
          <h2 className="font-heading text-lg">Select a Payment Plan</h2>
        </div>
        <div className="ml-4 px-4">
          <div className="flex items-center ">
            <input
              type="radio"
              id="free"
              name="paymentPlan"
              value="free"
              className="text-red-800 focus:ring-red-800"
              onChange={() => setPaymentPlan(false)}
            />
            <label htmlFor="free" className="ml-2">
              Free Tier
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="nonFree"
              name="paymentPlan"
              value="nonFree"
              className="text-red-800 focus:ring-red-800"
              onChange={() => setPaymentPlan(true)}
            />
            <label htmlFor="nonFree" className="ml-2">
              Premium Tier
            </label>
          </div>
        </div>
      </div>
      <div className="p-4 mr-4 mt-4 flex flex-row justify-end items-center">
        <svg fill="currentColor" viewBox="0 0 16 16" height="3em" width="3em">
          <path
            fillRule="evenodd"
            d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
          />
        </svg>
        <button className="relative inline-flex items-center justify-center p-4 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-800 to-red-500 hover:text-white">
          <span className="text-xl">Create Project</span>
        </button>
      </div>
    </div>
  );
}
