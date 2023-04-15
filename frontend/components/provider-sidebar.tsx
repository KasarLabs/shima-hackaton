import React, { useState } from "react";
import Link from "next/link";
import type { Node } from "../interfaces/";
type ProviderSidebarProps = {
  onOpenModal: () => void;
  nodes?: Node[];
};

export default function ProviderSidebar({
  onOpenModal,
  nodes,
}: ProviderSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4  bg-black text-white ">
        <Link href="/" className="flex items-center pl-2.5 mb-5">
          <img
            src="/black-red-akira.jpeg"
            className="h-10 mr-3"
            alt="Shima by tanjyanclo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap  font-heading">
            Shima
          </span>
        </Link>
        <ul className="space-y-2 font-medium font-body text-white">
          <li>
            <div
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 hover:text-black"
              onClick={onOpenModal}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-6 h-6 text-red-800 transition duration-75  group-hover:text-gray-900"
              >
                <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                Add a new RPC
              </span>
            </div>
          </li>
          <li>
            <a
              href="https://github.com/KasarLabs/shima-hackaton/tree/main/installer"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 hover:text-black"
              target="_blank"
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-6 h-6 text-red-800 transition duration-75  group-hover:text-gray-900"
              >
                <path d="M352 320c88.4 0 160-71.6 160-160 0-15.3-2.2-30.1-6.2-44.2-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16v-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0c-88.4 0-160 71.6-160 160 0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1 0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9l181.6-181.6c17 6.2 35.4 9.5 54.5 9.5zM80 456c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                Setup a new RPC
              </span>
            </a>
          </li>
          {/* https://github.com/KasarLabs/shima-hackaton/tree/main/installer */}

          <li>
            <button
              type="button"
              className="flex items-center w-full p-2  transition duration-75 rounded-lg group hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-red-800 transition duration-75 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3 text-white mr-4 hover:text-black">
                Dashboard
              </span>
              {nodes && (
                <svg
                  sidebar-toggle-item
                  className="w-6 h-6 text-red-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </button>
            {isOpen && (
              <ul className="py-2 space-y-2 text-white">
                {nodes?.map((node) => (
                  <li>
                    <Link href={`/provider/nodes/${node.id}`}>
                      <div className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 hover:text-black">
                        <div className="flex flex-row align-center ">
                          <p className="mr-2">{node.id}</p>
                          <p className=""> Network name</p>
                        </div>
                      </div>

                      {/* </a> */}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}
