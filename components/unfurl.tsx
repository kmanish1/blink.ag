"use client";

import { Blink, useBlink } from "@dialectlabs/blinks";
import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import "@dialectlabs/blinks/index.css";

interface UnfurlProps {
  blinkApiUrl: string;
}

export default function Unfurl({ blinkApiUrl }: UnfurlProps) {
  // Adapter, used to connect to the wallet
  const { adapter } = useBlinkSolanaWalletAdapter(
    "https://api.devnet.solana.com"
  );

  // Blink we want to execute
  const { blink, isLoading } = useBlink({ url: blinkApiUrl });

  return (
    <div className="w-full">
      {isLoading || !blink ? (
        <span className="text-gray-500">Loading...</span>
      ) : (
        <div className="w-full">
          <Blink
            blink={blink}
            adapter={adapter}
            securityLevel="all"
            stylePreset="x-dark"
          />
        </div>
      )}
    </div>
  );
}
