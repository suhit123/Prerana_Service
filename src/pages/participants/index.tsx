"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PassDesign from "../passdesign";
import Nav from "@/components/nav";

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
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredParticipants = participants.filter((participant) =>
    participant.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <>
    <Nav/>
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex flex-row items-center w-full max-w-7xl justify-between">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Participants</h1>
        <input
          type="text"
          placeholder="Search by Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md outline-none w-full px-3 max-w-2xl text-sm"
        />
      </div>
      <div className="overflow-x-auto w-full max-w-7xl">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Sno</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Affiliation</th>
              <th className="py-3 px-4 text-center">View Pass</th>
              <th className="py-3 px-4 text-center">Mail Pass</th>
            </tr>
          </thead>
          <tbody>
            {paginatedParticipants.map((participant, index) => (
              <tr key={participant.id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4">{startIndex + index + 1}</td>
                <td className="py-3 px-4">{participant.name}</td>
                <td className="py-3 px-4">{participant.email}</td>
                <td className="py-3 px-4">{participant.mobile}</td>
                <td className="py-3 px-4">{participant.affiliation}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleViewPass(participant)}
                    className="bg-orange-700 text-white px-4 py-1 rounded-md hover:bg-orange-600 transition"
                  >
                    View
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition">
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
    </div>
    </>
  );
};

export default Participants;
