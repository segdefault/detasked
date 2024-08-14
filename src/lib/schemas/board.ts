import { z } from "zod";

const NoteSchema = z.object({
	content: z.string().max(128, "Note too long"),
});

const ColumnSchema = z.object({
	title: z.string().max(16, "Title too long"),
	headerColor: z.string().regex(/^#[a-fA-F0-9]{6}$/),
	notes: NoteSchema.array(),
});

const BoardSchema = z.object({
	title: z.string().max(32, "Title too long"),
	columns: ColumnSchema.array(),
});

export type NoteSchema = z.infer<typeof NoteSchema>;
export type ColumnSchema = z.infer<typeof ColumnSchema>;
export type BoardSchema = z.infer<typeof BoardSchema>;

export default NoteSchema;
