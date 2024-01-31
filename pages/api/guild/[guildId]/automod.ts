import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import guildModel from "@/models/guild";
import mongoConnect from "@/lib/mongoConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { guildId } = req.query;
  if (!guildId) return res.status(400);

  // handling PUT requests
  if (req.method == "PUT") {
    const requestSchema = z.object({
      inviteBlocker: z.object({
        enabled: z.boolean(),
        delete: z.boolean(),
        mute: z.boolean(),
      }),
      blockBadWords: z.object({
        enabled: z.boolean(),
        delete: z.boolean(),
        mute: z.boolean(),
      }),
      blockLinks: z.object({
        enabled: z.boolean(),
        delete: z.boolean(),
        mute: z.boolean(),
      }),
      antiSpam: z.object({
        enabled: z.boolean(),
        delete: z.boolean(),
        mute: z.boolean(),
      }),
    });

    // schema validation
    const request = requestSchema.safeParse(req.body);
    if (!request.success) return res.status(400).send(request.error.issues[0].message);

    // db stuff
    const filter = { id: guildId };
    const newData = {
      automodSettings: request.data,
    };

    mongoConnect();

    await new Promise((r) => setTimeout(r, 2000));

    guildModel
      .findOneAndUpdate(filter, newData, { upsert: true })
      .then(() => res.status(200).json({ message: "Successfully updated Automod settings" }))
      .catch((e) => {
        res.status(500).json({ message: "Failed to update Automod settings" });
        return console.log(e);
      });
  }
}
