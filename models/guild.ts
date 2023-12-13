import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};
const reqBool = {
  type: Boolean,
  required: true,
};

const guildSchema = new mongoose.Schema({
  id: reqString,
  settings: {
    welcome: {
      enabled: reqBool,
      channelId: reqString,
      message: reqString,
    },
    goodbye: {
      enabled: reqBool,
      channelId: reqString,
      message: reqString,
    },
  },
});

export default mongoose.model("guild", guildSchema);
