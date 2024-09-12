import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import guildModel from "@/models/guild";
import mongoConnect from "@/lib/mongoConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guildId } = req.query;
  if (!guildId) return res.status(400);

  // handling PUT requests
  if (req.method == "PUT") {
    const requestSchema = z.object({
      welcome: z.object({
        enabled: z.boolean(),
        channelId: z.string(),
        message: z.string(),
      }),
      goodbye: z.object({
        enabled: z.boolean(),
        channelId: z.string(),
        message: z.string(),
      }),
    });

    type Request = z.infer<typeof requestSchema>;

    // schema validation
    const request = requestSchema.safeParse(req.body);
    if (!request.success)
      return res.status(400).send(request.error.issues[0].message);

    // db stuff
    const filter = { id: guildId };

    const newData = {
      welcomerSettings: {
        ...request.data,
      },
    };

    mongoConnect();
    guildModel // upsert makes it so that if such document doesnt exist, it creates one
      .findOneAndUpdate(filter, newData, { upsert: true })
      .then(() =>
        res
          .status(200)
          .json({ message: "Successfully saved Welcomer settings" })
      )
      .catch((e) => {
        res.status(500).json({ message: "Failed to save Welcomer settings" });
        return console.log(e);
      });
  }
}
