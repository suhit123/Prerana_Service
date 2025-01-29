import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import PassesSchema from '@/models/Passes';

dbConnect();

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
        default:
            res.status(400).json({ success: false });
    }
};

export default handler;
