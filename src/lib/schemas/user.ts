import { z } from "zod";

const UserSchema = z.object({
	publicId: z.string(),
});

export type UserSchema = z.infer<typeof UserSchema>;
export default UserSchema;
