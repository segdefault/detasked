import { z } from "zod";

export const BOARD_ID_LEN = 16;

export const NoteSchema = z.object({
	uuid: z.string().uuid(),
	content: z.string().max(128, "Note too long"),
});

export const ColumnSchema = z.object({
	uuid: z.string().uuid(),
	title: z.string().max(16, "Title too long"),
	headerColor: z.string().regex(/^#[a-fA-F0-9]{6}$/),
	notes: NoteSchema.array(),
});

export const BoardSchema = z.object({
	title: z.string().max(32, "Title too long"),
	columns: ColumnSchema.array(),
});

export const BoardIdSchema = z
	.string()
	.length(BOARD_ID_LEN)
	.regex(new RegExp(`^[a-fA-F0-9]{${BOARD_ID_LEN}}$`));

export type NoteSchema = z.infer<typeof NoteSchema>;
export type ColumnSchema = z.infer<typeof ColumnSchema>;
export type BoardSchema = z.infer<typeof BoardSchema>;

export default BoardSchema;
