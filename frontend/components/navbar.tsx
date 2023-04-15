import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <nav className="border-gray-200 bg-black text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            src="/black-red-akira.jpeg"
            className="h-10 mr-3"
            alt="Shima by tanjyanclo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-heading">
            Shima
          </span>
        </Link>
        <div className="flex md:order-2 font-body">
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
