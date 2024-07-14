import mongoose from "mongoose";

const rankDataSchema = new mongoose.Schema (
    {
        name: {type: String, required:true},
        points: {type: Number, required:true},
        insertedDate: {type: Date, required:true},
    }
);

const RankData = mongoose.model('Rank', rankDataSchema);

export default RankData;
