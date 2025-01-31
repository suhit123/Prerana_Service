import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface Participant {
  name: string;
  email: string;
  mobile: string;
  affiliation: string;
}

const AddParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [formData, setFormData] = useState<Participant>({
    name: "",
    email: "",
    mobile: "",
    affiliation: "GITAM",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData: Participant[] = XLSX.utils.sheet_to_json(sheet);
        setParticipants([...participants, ...parsedData]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.affiliation
    ) {
      alert("All fields are required");
      return;
    }
    setParticipants([...participants, formData]);
    setFormData({ name: "", email: "", mobile: "", affiliation: "GITAM" });
  };

  const handleSubmitData = async () => {
    setMessage("Adding participants...");
    setMessageType("info");
    await axios
      .post("/api/participants", participants)
      .then((response) => {
        console.log(response.data);
        setMessage("Participants added successfully");
        setMessageType("success");
        setParticipants([]);
      })
      .catch((error) => {
        console.error("Error adding participants: ", error);
        setMessage("Error adding participants");
        setMessageType("error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6 h-96 overflow-y-scroll">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
        Add Participants
      </h1>

      {/* Message Styling */}
      {message && (
        <div
          className={`${
            messageType === "success"
              ? "bg-green-500 text-white"
              : messageType === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          } p-4 rounded-lg mb-6 flex items-center`}
        >
          <span className="mr-2">
            {messageType === "success" && "✔️"}
            {messageType === "error" && "❌"}
            {messageType === "info" && "ℹ️"}
          </span>
          <p className="font-medium">{message}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-2 gap-2"
      >
        <div className="space-y-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block text-gray-700 font-medium">
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label
            htmlFor="affiliation"
            className="block text-gray-700 font-medium"
          >
            Affiliation
          </label>
          <select
            id="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="GITAM">GITAM</option>
            <option value="NON_GITAM">NON_GITAM</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Participant
        </button>
        <button
          onClick={handleSubmitData}
          className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Participants
        </h2>
        <div className="flex flex-row justify-between">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="mb-4 block w-full"
          />
        </div>
        {participants.length === 0 ? (
          <p className="text-gray-500">No participants added yet.</p>
        ) : (
          <ul className="flex flex-row flex-wrap gap-4">
            {participants?.reverse().map((participant, idx) => (
              <li key={idx} className="p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-lg font-medium">{participant.name}</p>
                <p className="text-gray-600">{participant.email}</p>
                <p className="text-gray-600">{participant.mobile}</p>
                <p className="text-gray-600">{participant.affiliation}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddParticipants;
