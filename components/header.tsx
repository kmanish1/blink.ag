"use client";

import React, { useEffect } from "react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import useDashboardStore from "@/state/page";
import useAddressStore from "@/state/address";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export const Header: React.FC = () => {
  const { connected, publicKey, disconnect, disconnecting } = useWallet();
    const { showDashboard, setShowDashboard } = useDashboardStore();
    const { address, setAddress } = useAddressStore();
    useEffect(() => {
      if (connected) {
        setAddress([publicKey?.toString()!]);
        setShowDashboard(true);
      }
      if (disconnecting) {
        setShowDashboard(false);
      }
    }, [connected, disconnecting]);
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div className="flex justify-center items-center">
        <Link href="/" className="p-2">
          <HomeIcon size={16} />
          <span className="sr-only">Mehedi</span>
        </Link>
        <a
          href="/"
          className="font-semibold text-lg sm:text-xl"
          onClick={async (e) => {
            e.preventDefault();
            setShowDashboard(false);
            setAddress([]);
            if (connected) await disconnect();
          }}
        >
          blink.ag
        </a>
      </div>
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
        <WalletMultiButton>
          {connected ? null : (
            <div className="transition-all duration-300 rounded-xl px-4 py-2 text-sm sm:text-base">
              Connect Wallet
            </div>
          )}
        </WalletMultiButton>
      </div>
    </header>
  );
};
export default Header;