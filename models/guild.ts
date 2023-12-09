import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};
const guildSchema = new mongoose.Schema({
  id: reqString,
  name: reqString,
  iconUrl: reqString,
  settings: {
    welcome: {
      channelId: reqString,
      message: reqString,
    },
    goodbye: {
      channelId: reqString,
      message: reqString,
    },
  },
});

export default mongoose.model("guild", guildSchema);