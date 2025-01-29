import React, { useState } from "react";
import Nav from "@/components/nav";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function Home() {
  const [scanValue, setScanValue] = useState<string | null>(null); // Specify type here

  return (
    <>
      <Nav />
      <div className="max-w-96">
        <Scanner
          onScan={(result) => {
            if (result.length > 0) {
              console.log(result[0].rawValue);
              setScanValue(result[0].rawValue);
            }
          }}
        />
        <div className="flex justify-center mt-5">
          <p className="text-lg">Scanned Value: {scanValue}</p>
        </div>
      </div>
    </>
  );
}
