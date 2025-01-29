import dbConnect from '@/utils/dbConnect'
import PassesSchema from '@/models/Passes'
dbConnect();
export default async (req:any,res:any)=>{
    const {method}=req;
    switch(method){
        case 'GET':
            try{
                const participants=await PassesSchema.find({});
                res.status(200).json({success:true,data:participants});
            }catch(err:any){
                console.error(err);
                res.status(400).json({success:false});
            }
            break;
        default:
            res.status(400).json({success:false});
    };
};