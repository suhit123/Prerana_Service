import mongoose from 'mongoose';
const PassesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
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
module.exports =
  mongoose.models.passes || mongoose.model("passes", PassesSchema);
