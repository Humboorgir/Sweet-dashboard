import axios from "axios";
import guildModel from "@/models/guild";
import mongoConnect from "@/lib/mongoConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.DISCORD_BOT_TOKEN) console.log("[WARNING] Couldn't find process.env.DISCORD_BOT_TOKEN");

  const { guildId } = req.query;
  if (!guildId) return res.status(400);

  // handling GET requests
  // Responds with the list of guilds (servers) sweet's been added to
  if (req.method == "GET") {
    try {
      const guild = (
        await axios.get(`https://discord.com/api/guilds/${guildId}`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        })
      ).data;

      res.status(200).json(guild);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Failed to fetch guild info" });
    }
  }

  // handling PUT requests
  if (req.method == "PUT") {
    // TODO: rewrite all this with zod
    // (too lazy to write their types right now even tho it would probably take less time)
    const { welcomeMsgsEnabled, welcomeMsg, welcomeChannel, goodbyeMsgsEnabled, goodbyeMsg, goodbyeChannel } =
      req.body;
    if (
      typeof welcomeMsgsEnabled != "boolean" ||
      !welcomeMsg ||
      !welcomeChannel ||
      typeof goodbyeMsgsEnabled != "boolean" ||
      !goodbyeMsg ||
      !goodbyeChannel
    )
      return res.status(400);

    // db stuff
    const filter = { id: guildId };
    const newData = {
      settings: {
        welcome: {
          enabled: welcomeMsgsEnabled,
          channelId: welcomeChannel.value,
          message: welcomeMsg,
        },
        goodbye: {
          enabled: goodbyeMsgsEnabled,
          channelId: goodbyeChannel.value,
          message: goodbyeMsg,
        },
      },
    };

    mongoConnect();
    guildModel // upsert makes it so that if such document doesnt exist, it creates one
      .findOneAndUpdate(filter, newData, { upsert: true })
      .then(() => res.status(200).json({ message: "Successfully saved guild settings" }))
      .catch((e) => {
        res.status(500).json({ message: "Failed to save guild settings" });
        return console.log(e);
      });
  }
}
