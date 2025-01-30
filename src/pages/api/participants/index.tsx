import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import PassesSchema from '@/models/Passes';

dbConnect();

interface Participant {
    name: string;
    email: string;
    mobile: string;
    affiliation: string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case 'GET':
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

                if (participants.length === 0) {
                    return res.status(400).json({ success: false, message: "Invalid input format" });
                }
                // console.log(participants);
                // Convert emails to lowercase before inserting
                const formattedParticipants = participants.map((participant:Participant) => ({
                    name: participant.name,
                    email: participant.email.toLowerCase(),
                    mobile: participant.mobile,
                    affiliation: participant.affiliation
                }));

                // Insert into database
                const insertedParticipants = await PassesSchema.insertMany(formattedParticipants, { ordered: false })
                .catch((error: unknown) => {
                    if (typeof error === "object" && error !== null && "code" in error) {
                        const err = error as { code: number; insertedDocs?: any[] }; 
                        if (err.code === 11000) {
                            console.warn("Duplicate entries detected, ignoring...");
                            return err.insertedDocs || [];
                        }
                    }
                    throw error;
                });

                res.status(201).json({ success: true, data: insertedParticipants });
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
