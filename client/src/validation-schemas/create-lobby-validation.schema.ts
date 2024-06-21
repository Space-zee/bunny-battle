import { z } from "zod";

export const createLobbyValidationShcema = z.object({
  value: z.coerce
    .number({ invalid_type_error: "Please enter the bid value" })
    .min(0.0001, "Bid can not be less then 0.0001ETH"),
});

export type CreateLobbyValidationShcema = z.infer<
  typeof createLobbyValidationShcema
>;
