"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PassDesign from "../passdesign";
import Nav from "@/components/nav";
import Spinner1 from "@/components/spinner1";
import AddParticipants from "../addParticipants";

interface Participant {
  id: number;
  name: string;
  email: string;
  mobile: string;
  affiliation: string;
}

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 30;
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [selectedMailParticipant, setSelectedMailParticipant] =useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [addParticipantsModal, setAddParticipantsModal] = useState(false);
  console.log(loading);
  const getParticipants = async () => {
    setLoading(true);
    await axios
      .get("./api/participants")
      .then((response) => {
        setParticipants(response.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching participants: ", error);
        setParticipants([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getParticipants();
  }, []);

  const filteredParticipants = participants.filter(
    (participant) =>
      (participant &&
        participant.email &&
        participant?.email
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (participant &&
        participant.name &&
        participant.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredParticipants.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedParticipants = filteredParticipants.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handleViewPass = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };
  const handleMailPass = (participant: Participant) => {
    setSelectedMailParticipant(participant);
    setIsMailModalOpen(true);
  };
  const handleCloseMailModal = () => {
    setIsMailModalOpen(false);
    setSelectedMailParticipant(null);
  };
  return (
    <>
      <Nav />
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="flex flex-row items-center w-full max-w-7xl justify-between">
          <h1 className="text-xl sp:text-lg se:text-lg font-semibold text-gray-800 mb-6">
            Participants
          </h1>
          <input
            type="text"
            placeholder="Search by Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 sp:p-1 se:p-1 border border-gray-300 sp:w-[200px] se:w-[200px] rounded-md outline-none w-full sp:px-1 se:px-1 px-3 max-w-2xl text-sm"
          />
          <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" onClick={() => setAddParticipantsModal(true)}>
            Add Participants
          </button>
        </div>
        <div className="overflow-x-auto w-full max-w-7xl">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-left">
                  Sno
                </th>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-left">
                  Name
                </th>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-left">
                  Email
                </th>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-left">
                  Mobile
                </th>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-left">
                  Affiliation
                </th>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-center">
                  View Pass
                </th>
                <th className="py-3 px-4 sp:py-2 sp:px-3 se:py-2 se:px-3 text-center">
                  Mail Pass
                </th>
              </tr>
            </thead>
            <tbody className="sp:text-xs se:text-xs">
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center ">
                    <div className="scale-150">
                      <Spinner1 />
                    </div>
                  </td>
                </tr>
              )}
              {paginatedParticipants.map((participant, index) => (
                //first row for loader
                <tr
                  key={participant.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-3 sp:py-2 sp:px-3 se:py-2 se:px-3 px-4">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-3 sp:py-2 sp:px-3 se:py-2 se:px-3 px-4">
                    {participant.name}
                  </td>
                  <td className="py-3 sp:py-2 sp:px-3 se:py-2 se:px-3 px-4">
                    {participant.email}
                  </td>
                  <td className="py-3 sp:py-2 sp:px-3 se:py-2 se:px-3 px-4">
                    {participant.mobile}
                  </td>
                  <td className="py-3 sp:py-2 sp:px-3 se:py-2 se:px-3 px-4">
                    {participant.affiliation}
                  </td>
                  <td className="py-3 sp:py-2 sp:px-3 px-4 se:py-2 se:px-3 text-center">
                    <button
                      onClick={() => handleViewPass(participant)}
                      className="bg-orange-700 text-white px-4 py-1 rounded-md hover:bg-orange-600 transition"
                    >
                      View
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleMailPass(participant)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Mail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white border rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Modal for Add Participants */}
        {addParticipantsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-92 relative">
              <button
                onClick={() => setAddParticipantsModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <AddParticipants />
            </div>
          </div>
        )}


        {/* Modal for Pass Design */}
        {isModalOpen && selectedParticipant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-92 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <PassDesign
                name={selectedParticipant.name}
                email={selectedParticipant.email}
                mobile={selectedParticipant.mobile}
                affiliation={selectedParticipant.affiliation}
              />
            </div>
          </div>
        )}
        {
          isMailModalOpen && selectedMailParticipant && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-92 relative">
                <button
                  onClick={handleCloseMailModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <PassDesign
                  name={selectedMailParticipant.name}
                  email={selectedMailParticipant.email}
                  mobile={selectedMailParticipant.mobile}
                  affiliation={selectedMailParticipant.affiliation}
                  sendMailStatus={true}
                />
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Participants;
