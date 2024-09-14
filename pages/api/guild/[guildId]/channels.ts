import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guildId } = req.query;
  if (!guildId) return res.status(400);
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.log(`[getChannels] Couldn't find process.env.DISCORD_BOT_TOKEN`);
    return res.status(500);
  }

  axios
    .get(`https://discord.com/api/guilds/${guildId}/channels`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    })
    .then((res) => res.data)
    .then((data) => res.status(200).json(data))
    .catch((e) => {
      console.log(e);
      return res
        .status(500)
        .json({ message: "Failed to fetch guild channels" });
    });
}

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };
