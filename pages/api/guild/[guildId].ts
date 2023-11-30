// Responds with the list of guilds (servers) sweet's been added to

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.DISCORD_BOT_TOKEN) console.log("[WARNING] Couldn't find process.env.DISCORD_BOT_TOKEN");
  if (req.method !== "GET") return;

  const { guildId } = req.query;
  if (!guildId) return res.status(400);

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
