import mongoose from 'mongoose';
const PassesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    }
});
export default mongoose.models.passes || mongoose.model('passes', PassesSchema);