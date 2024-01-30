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
    welcomer: {
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
    automod: {
      inviteBlocker: {
        enabled: reqBool,
        delete: reqBool,
        mute: reqBool,
      },
      blockBadWords: {
        enabled: reqBool,
        delete: reqBool,
        mute: reqBool,
      },
      blockLinks: {
        enabled: reqBool,
        delete: reqBool,
        mute: reqBool,
      },
      antiSpam: {
        enabled: reqBool,
        delete: reqBool,
        mute: reqBool,
      },
    },
  },
});

const model = mongoose.models.Guild || mongoose.model("Guild", guildSchema);
export default model;
