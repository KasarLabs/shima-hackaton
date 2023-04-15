import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/user-sidebar";
import Dashboard from "../../components/dashboard";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { User } from "../../interfaces";

const UserDashboard: NextPage = () => {
  const { address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen ">
      <Sidebar />
      <>
        {isMounted &&
          (address ? (
            <Dashboard />
          ) : (
            <div className="ml-64 text-white p-32 flex flex-col justify-center items-center ">
              <div className=" font-heading text-3xl p-4">
                😥 you are not connected
              </div>
              <div className="font-heading text-xl mb-4">
                Please connect your wallet
              </div>
              <div className="">
                <ConnectButton />
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default UserDashboard;
// const [user, setUser] = useState<User>({} as User);

// useEffect(() => {
//   // Fetch users
//   if (address) {
//     axios
//       .get(`http://localhost:3001/users/${address}`)
//       .then((response) => {
//         console.log("res", response);
//         if (response.data === undefined) {
//           const randomKey = generateRandomKey(100000, 999999);
//           const newUser: User = {
//             id: 1,
//             wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
//             key: randomKey.toString(),
//             computation_units: 10,
//           };

//           axios
//             .post("http://localhost:3001/users/", newUser)
//             .then((response) => {
//               console.log("New user created:", response.data);
//             })
//             .catch((error) => {
//               console.error("Error creating new user:", error);
//             });
//         } else {
//           setUser(response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });
//   }
// }, [address]);
// console.log("user", user);
