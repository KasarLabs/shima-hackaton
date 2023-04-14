import * as React from "react";
import Link from "next/link";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-center text-6xl mt-12 lg:text-8xl md:text-7xl font-heading font-bold">
        <span>Shim</span>
        <span className="text-red-800">a</span>
      </h1>

      <h1 className="text-center text-3xl mt-3 lg:text-5xl md:text-4xl font-heading">
        The decentralized RPC Provider
      </h1>

      <div className="text-center mt-6 mx-6 font-body">
        <p>
          Shima offers a decentralized network of user-contributed RPC nodes for
          enhanced reliability and performance.
        </p>
        <p>
          By intelligently routing requests, Shima ensures optimal performance
          and reduced latency.
        </p>
      </div>

      <div className="flex justify-center mt-28 font-body">
        <Link href="/provider">
          <button className="relative inline-flex items-center justify-center py-3 px-5 mb-2 mr-10 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-800 to-red-500  hover:text-white">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0 text-xl">
              Get Started as a Provider
            </span>
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="relative inline-flex items-center justify-center py-3 px-5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-800 to-red-500 hover:text-white">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0 text-xl">
              Get Started as a User
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
