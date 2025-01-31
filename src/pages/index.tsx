import React, { useState } from "react";
import Nav from "@/components/nav";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import Spinner1 from "@/components/spinner1";

interface ParticipantDetails {
  name: string;
  email: string;
  mobile: string;
  affiliation: string;
}
import { useRef } from "react";

export default function Home() {
  const [scanValue, setScanValue] = useState<string | null>(null); // Specify type here
  const [dataLoader, setDataLoader] = useState(false);
  const [pause, setPause] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [notFound, setNotFound] = useState(false);
  const [participantDetails, setParticipantDetails] = useState<ParticipantDetails>({
    name: "",
    email: "",
    mobile: "",
    affiliation: "",
  });
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const fetchUserDetails = async (email: string) => {
    setDataLoader(true);
    try {
      const response = await axios.get(`/api/participants/participant?email=${email}`);
      const details = response.data?.data;
      console.log(details);
      if (!details) {
        setNotFound(true);
        return;
      }
      setNotFound(false);
      setParticipantDetails({
        name: details.name,
        email: details.email,
        mobile: details.mobile,
        affiliation: details.affiliation,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoader(false);
    }
  };

  console.log(scanValue);
  return (
    <>
      <Nav />
      <div className="max-w-96 mx-auto p-2">
        <div className="justify-center bg-gray-100 p-5 py-7 rounded-lg my-3">
          <h1 className="text-xl font-semibold text-center">Scan QR Code</h1>
          <p className="text-center">
            Bottom you will see the details of the scanned QR code
          </p>
        </div>
        <div className="relative h-[350px]">
          {dataLoader && (
            <div className="absolute z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-lg">
              <Spinner1 />
            </div>
          )}
          <audio ref={audioRef} src="/beep-02.mp3" preload="auto"></audio>
          <Scanner
            allowMultiple={true}
            paused={pause}
            onScan={(result) => {
              if (result.length > 0) {
                playSound();
                setPause(true);
                console.log(result[0].rawValue);
                setScanValue(result[0].rawValue);
                console.log(scanValue);
                setParticipantDetails({
                  name: "",
                  email: "",
                  mobile: "",
                  affiliation: "",
                }); // Reset participant details before fetching new data
                setDataLoader(true);
                fetchUserDetails(result[0].rawValue);
                //after 2 seconds set pause to false
                setTimeout(() => {
                  setPause(false);
                }, 1000);
              }
            }}
            onError={(error) => alert(error)}
          />
          {notFound && (
            <div className="justify-center text-center mt-5">
              <h1 className="text-red-600 text-xl font-bold">IMPOSTER ALERT</h1>
              <p className="text-center">
                QR is <span className="text-red-700">invalid</span>!. Seems like
                candidate is not{" "}
                <span className="text-red-700">registered</span>!
              </p>
            </div>
          )}
        </div>
        {participantDetails.name && (
          <div className="justify-center mt-5">
            <h3 className="text-md mb-2 font-medium">
              Details of the scanned QR code
            </h3>
            <table className="table-auto max-w-3xl w-full border-collapse rounded-lg shadow-md text-sm">
              <thead>
                <tr className="bg-green-800 text-white">
                  <th className="px-4 py-2 text-left">Field</th>
                  <th className="px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 border-t border-gray-300">
                  <td className="px-4 py-2 font-semibold">Name</td>
                  <td className="px-4 py-2">{participantDetails?.name}</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2 font-semibold">Email</td>
                  <td className="px-4 py-2">{participantDetails?.email}</td>
                </tr>
                <tr className="bg-gray-100 border-t border-gray-300">
                  <td className="px-4 py-2 font-semibold">Mobile</td>
                  <td className="px-4 py-2">{participantDetails?.mobile}</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2 font-semibold">Affiliation</td>
                  <td className="px-4 py-2">{participantDetails?.affiliation}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
