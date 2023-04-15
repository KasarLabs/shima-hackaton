// pages/node/[id].tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import type { Node } from "../../../interfaces/";
import { ParsedUrlQuery } from "querystring";
import ProviderSidebar from "../../../components/provider-sidebar";
import AddRpcModal from "../../../components/AddRpcModal";
import Link from "next/link";
import FakePerformanceChart from "../../../components/FakePerformanceChart";
interface NodeDashboardProps {
  node: Node;
  nodes: Node[];
}

const NodeDashboard = ({ node, nodes }: NodeDashboardProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 min-h-screen ml-64 bg-black text-white">
      <ProviderSidebar nodes={nodes} onOpenModal={handleOpenModal} />
      <AddRpcModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <button>
        <Link href="/provider">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            className="h-6 w-6 text-red-800"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8z"
            />
          </svg>
        </Link>
      </button>
      <div className="flex flex-row align-middle">
        <h1 className="text-3xl font-heading">Node ID: {node.id} </h1>
      </div>
      <div className="divide-x grid grid-cols-3 gap-4 mb-4 p-4 ml-4 border items-center mt-4 rounded-lg">
        <div className="p-4 flex flex-row items-center justify-center">
          <svg
            viewBox="0 0 920 1000"
            fill="currentColor"
            className="text-red-800 h-8 w-8"
          >
            <path d="M224 346c-14.667 0-28.667 3.333-42 10-32-34.667-62.667-77.333-92-128 36-49.333 78.667-88.667 128-118 61.333 25.333 112 52.667 152 82-4 10.667-6 21.333-6 32 0 4 1.333 11.333 4 22-41.333 32-80 66.667-116 104-10.667-2.667-20-4-28-4m-98 98c0 22.667 6.667 42.667 20 60-40 76-66.667 153.333-80 232C22 665.333 0 586.667 0 500c0-73.333 16.667-142 50-206 25.333 41.333 53.333 78.667 84 112-5.333 16-8 28.667-8 38m336-318c-18.667 0-35.333 4.667-50 14-38.667-28-76.667-51.333-114-70 56-20 110-30 162-30 80 0 156.667 20.667 230 62-50.667 9.333-104.667 26-162 50-17.333-17.333-39.333-26-66-26m146 460c-106.667-16-203.333-53.333-290-112 2.667-13.333 4-23.333 4-30 0-16-4.667-33.333-14-52 25.333-29.333 58-59.333 98-90 17.333 13.333 36 20 56 20 9.333 0 22-2.667 38-8 62.667 72 107.333 152 134 240-10.667 9.333-19.333 20-26 32m128 132c25.333-9.333 43.333-29.333 54-60 38.667-2.667 74.667-8.667 108-18-30.667 97.333-86 174.667-166 232 4-32 6-64.667 6-98 0-6.667-.333-16-1-28s-1-21.333-1-28m-150-66c-126.667 64-228 154.667-304 272-60-24-112.667-60.667-158-110 8-96 34.667-187.333 80-274 4 1.333 10.667 2 20 2 20 0 37.333-4.667 52-14 94.667 65.333 198 106.667 310 124m184-492c100 90.667 150 204 150 340 0 14.667-1.333 36.667-4 66-42.667 12-86 20-130 24-16-37.333-45.333-57.333-88-60-32-97.333-81.333-185.333-148-264 6.667-13.333 10-27.333 10-42v-10c66.667-28 136.667-46 210-54M634 704c9.333 6.667 20 12.667 32 18 1.333 12 2 29.333 2 52 0 53.333-4.667 101.333-14 144-57.333 28-122 42-194 42-38.667 0-76-4-112-12 73.333-106.667 168.667-188 286-244" />
          </svg>
          <p className="ml-3">Syncing</p>
        </div>
        <div className="p-4 flex flex-row items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-red-800 h-8 w-8"
          >
            <path d="M17.895 3.553A1.001 1.001 0 0017 3H7c-.379 0-.725.214-.895.553l-4 8a1 1 0 000 .895l4 8c.17.338.516.552.895.552h10c.379 0 .725-.214.895-.553l4-8a1 1 0 000-.895l-4-7.999zM19.382 11h-7.764l-3-6h7.764l3 6zM4.118 12L7 6.236 9.882 12 7 17.764 4.118 12zm12.264 7H8.618l3-6h7.764l-3 6z" />
          </svg>
          <p className="ml-3">Last block: 24300</p>
        </div>
        <div className="p-4 flex flex-row items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-red-800 h-8 w-8"
          >
            <path d="M19 3c-1.654 0-3 1.346-3 3 0 .502.136.968.354 1.385l-1.116 1.302A3.976 3.976 0 0013 8c-.739 0-1.425.216-2.02.566L9.566 7.152A3.449 3.449 0 0010 5.5C10 3.57 8.43 2 6.5 2S3 3.57 3 5.5 4.57 9 6.5 9c.601 0 1.158-.166 1.652-.434L9.566 9.98A3.972 3.972 0 009 12c0 .997.38 1.899.985 2.601l-1.692 1.692.025.025A2.962 2.962 0 007 16c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3c0-.476-.121-.919-.318-1.318l.025.025 1.954-1.954c.421.15.867.247 1.339.247 2.206 0 4-1.794 4-4a3.96 3.96 0 00-.439-1.785l1.253-1.462c.364.158.764.247 1.186.247 1.654 0 3-1.346 3-3s-1.346-3-3-3zM7 20a1 1 0 110-2 1 1 0 010 2zM5 5.5C5 4.673 5.673 4 6.5 4S8 4.673 8 5.5 7.327 7 6.5 7 5 6.327 5 5.5zm8 8.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm6-7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          <p className="ml-3"># peer connections: 126</p>
        </div>
      </div>
      <div className="w-2/3 h-96 mx-auto py-12">
        <FakePerformanceChart />
      </div>
      {/* Add more Node Dashboard content here */}
    </div>
  );
};

export default NodeDashboard;

const findNodeById = (id: number): Node | undefined => {
  const exampleNodes: Node[] = [
    { id: 1, network: "Polygon" },
    { id: 2, network: "Taiko" },
    { id: 3, network: "Celo" },
    { id: 4, network: "Gnosis" },
  ];

  return exampleNodes.find((node) => node.id === id);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as ParsedUrlQuery;

  const nodeId = parseInt(id as string, 10);
  const node = findNodeById(nodeId);

  if (!node) {
    // If the node is not found, return a 404 error
    return {
      notFound: true,
    };
  }

  const nodes: Node[] = [
    { id: 1, network: "Polygon" },
    { id: 2, network: "Taiko" },
    { id: 3, network: "Celo" },
    { id: 4, network: "Gnosis" },

    // Add more nodes here or fetch them from an API
  ];

  return {
    props: {
      node,
      nodes,
    },
  };
};
