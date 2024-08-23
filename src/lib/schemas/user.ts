import { z } from "zod";

export enum UserSchemaError {
	INVALID_PRIVATE_ID = "INVALID_ID",
	UNK = "UNK",
}

export const PRIVATE_KEY_LEN = 32;

export const PrivateIdSchema = z.string().length(PRIVATE_KEY_LEN);

const UserSchema = z.object({
	publicId: z.string(),
});

export type UserSchema = z.infer<typeof UserSchema>;
export default UserSchema;
