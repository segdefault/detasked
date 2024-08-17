import { z } from "zod";

export const BOARD_ID_LEN = 16;
export const NOTE_CONTENT_LEN = 128;
export const COLUMN_TITLE_LEN = 16;
export const BOARD_TITLE_LEN = 32;

export enum BoardSchemaError {
	INVALID_ID = "INVALID_ID",
	INVALID_BOARD = "INVALID_BOARD",
	BOARD_TITLE_LONG = "BOARD_TITLE_LONG",
	COLUMN_TITLE_LONG = "COLUMN_TITLE_LONG",
	NOTE_LONG = "NOTE_LONG",
	NOTE_UUID = "NOTE_UUID",
	COLUMN_UUID = "COLUMN_UUID",
	UNK = "UNK",
}

export const NoteSchema = z.object({
	uuid: z.string().uuid(BoardSchemaError.NOTE_UUID),
	content: z.string().max(NOTE_CONTENT_LEN, BoardSchemaError.NOTE_LONG),
});

export const ColumnSchema = z.object({
	uuid: z.string().uuid(BoardSchemaError.COLUMN_UUID),
	title: z.string().max(COLUMN_TITLE_LEN, BoardSchemaError.COLUMN_TITLE_LONG),
	headerColor: z.string().regex(/^#[a-fA-F0-9]{6}$/),
	notes: NoteSchema.array(),
});

export const BoardSchema = z.object({
	title: z.string().max(BOARD_TITLE_LEN, BoardSchemaError.BOARD_TITLE_LONG),
	columns: ColumnSchema.array(),
});

export const BoardIdSchema = z
	.string()
	.length(BOARD_ID_LEN)
	.regex(
		new RegExp(`^[a-fA-F0-9]{${BOARD_ID_LEN}}$`),
		BoardSchemaError.INVALID_BOARD,
	);

export type NoteSchema = z.infer<typeof NoteSchema>;
export type ColumnSchema = z.infer<typeof ColumnSchema>;
export type BoardSchema = z.infer<typeof BoardSchema>;

export default BoardSchema;
