import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import PassesSchema from "@/models/Passes";

dbConnect();

interface Participant {
  name: string;
  email: string;
  mobile: string;
  affiliation: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const participants = await PassesSchema.find({});
        res.status(200).json({ success: true, data: participants });
      } catch (err) {
        console.error(err);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedParticipant = await PassesSchema.deleteMany({});
        res.status(200).json({ success: true, data: deletedParticipant });
      } catch (err) {
        console.error(err);
        res.status(400).json({ success: false });
      }
    case 'POST':
        try {
            const participants = req.body; // Expecting an array of participants
    
            if (!Array.isArray(participants) || participants.length === 0) {
                return res.status(400).json({ success: false, message: "Invalid input format", data: participants });
            }
    
            // Convert emails to lowercase before inserting
            const formattedParticipants = participants.map((participant: Participant) => ({
                name: participant.name,
                email: participant.email.toLowerCase(),
                mobile: participant.mobile?.toString(),
                affiliation: participant.affiliation
            }));
    
            // **Check existing emails in the database first**
            const existingEmails = await PassesSchema.find(
                { email: { $in: formattedParticipants.map(p => p.email) } },
                { email: 1, _id: 0 }
            );
    
            const existingEmailSet = new Set(existingEmails.map(p => p.email));
    
            // **Filter out participants that already exist**
            const newParticipants = formattedParticipants.filter(p => !existingEmailSet.has(p.email));
    
            if (newParticipants.length === 0) {
                return res.status(200).json({ success: true, message: "All participants already exist. No new entries added.", data: [] });
            }
    
            // **Insert only new participants**
            const insertedParticipants = await PassesSchema.insertMany(newParticipants, { ordered: false });
    
            res.status(201).json({
                success: true,
                message: "Participants added successfully, duplicates ignored.",
                insertedCount: insertedParticipants.length,
                data: insertedParticipants
            });
    
        } catch (err) {
            console.error("Error inserting participants:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
        break;

    default:
      res.status(400).json({ success: false });
  }
};

export default handler;
