// NodeItem.tsx
import React from "react";
import Link from "next/link";
import { Provider } from "../interfaces";
interface NodeItemProps {
  node: Provider;
  isShaking: boolean;
  isMinusVisible: boolean;
  onNodeItemClick: () => void;
}

const NodeItem: React.FC<NodeItemProps> = ({
  node,
  isShaking,
  isMinusVisible,
  onNodeItemClick,
}) => {
  return (
    <div
      className={`border p-4 rounded-lg relative transform transition-transform duration-300 hover:scale-110 hover:z-50 bg-black ${
        isShaking ? "animate-shake hover:cursor-pointer" : ""
      }`}
      onClick={isShaking ? onNodeItemClick : undefined}
    >
      {isMinusVisible && (
        <div className="absolute top-0 right-0 mt-1 mr-1 text-red-500">
          <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-8 w-8">
            <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
          </svg>
        </div>
      )}
      <Link href={`/provider/nodes/${node.id}`}>
        <div>
          <div className="flex flex-col">
            <p className="font-semibold">Node: {node.id}</p>
            <p>ChainId: {node.chain_id}</p>
            <p className="">RPC: {node.rpc_url}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NodeItem;
