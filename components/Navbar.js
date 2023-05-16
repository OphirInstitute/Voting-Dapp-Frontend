import React, { useState } from "react";
// imported the ethers libary i would be using
import { ethers } from "ethers";
import Image from 'next/image';
import OphirLogo from "./assets/ophir-remove.png";

// created a navbar components
const Navbar = () => {
  // stored the states here
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  // a function to connect wallet
  const handleConnectMetamask = async () => {
    // used the try block just so i can catch errors easily
    try {
      // declared the provider here to search for window.ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // make a request to connect network
      await provider.send("eth_requestAccounts", []);
      // declared signer
      const signer = await provider.getSigner();
      // chainId of the connected network
      const chainId = await signer.getChainId();

      // we have a conditional block here that says if the user chainID isn't equal to that of the the Mumbai Network
      if (chainId !== "0x13881") {
        try {
          // make a request to change the connected chain
          await provider.send("wallet_switchEthereumChain", [
            { chainId: `0x13881` },
          ]);
        } catch (error) {
          // catcch error block
          console.error("Error requesting account switch:", error);
          return;
        }
      }

      // a constant to get address
      const address = await signer.getAddress();
      // use the slice method to truncate address
      const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
      // set signer
      setConnected(signer);
      // set connected address
      setAddress(truncatedAddress);
    } catch (error) {
      // catch error
      console.log("Error Connecting: ", error);
    }
  };


  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
       <div>
      <a className="hover:text-gray-300 cursor-pointer">
        <Image src={OphirLogo} alt="VoteBlock logo" width={150} height={50} />
      </a>
    </div>

      <div>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-half border-gray-500 border-2"
          onClick={handleConnectMetamask}
        >
          { connected ? address : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
